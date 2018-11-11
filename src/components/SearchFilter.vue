<template>
  <div class="filter-wrapper"
       :class="$mq">
    <transition name="fade">
      <div class="search-filter"
           v-if="visible"
           :class="$mq">
        <div class="filter-item">
          <FilterSelect :options="sortOptions"
                        v-model="sortValue"></FilterSelect>
        </div>
        <div class="filter-item"
             v-if="mobile">
          <RadioSelect :options="filterOptions.airport"
                       v-model="airportSelected"
                       display="wrap"
                       @change="filterOnChange($event, 'airport')"
                       label="Airport"
                       name="airport"></RadioSelect>
        </div>
        <div class="filter-item"
             v-if="mobile">
          <RadioSelect :options="filterOptions.duration"
                       v-model="durationSelected"
                       display="cols"
                       @change="filterOnChange($event, 'duration')"
                       label="Duration"
                       name="duration"></RadioSelect>
        </div>
        <div class="filter-item">
          <CheckboxSelect :options="filterOptions.accomodation"
                          @change="filterOnChange($event, 'accomodation')"
                          label="Accommodation"></CheckboxSelect>
        </div>
        <div class="filter-item">
          <CheckboxSelect :options="filterOptions.boardBasis"
                          @change="filterOnChange($event, 'boardBasis')"
                          label="Board basis"></CheckboxSelect>
        </div>
        <div class="filter-item">
          <CheckboxSelect :options="filterOptions.goodFor"
                          @change="filterOnChange($event, 'goodFor')"
                          label="Good for"></CheckboxSelect>
        </div>
        <div class="filter-item">
          <CheckboxSelect :options="filterOptions.resort"
                          @change="filterOnChange($event, 'resort')"
                          label="Country or resort"
                          :tree="true"></CheckboxSelect>
        </div>
        <div class="filter-item button-block">
          <div class="buttons">
            <button class="cancel-button"
                    v-if="mobile"
                    @click="$emit('cancel')">Cancel</button>
            <button class="apply-button"
                    @click="$emit('cancel')"
                    :disabled="applyDisabled">Apply filters</button>
          </div>

        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import CheckboxSelect from "./CheckboxSelect";
import RadioSelect from "./RadioSelect";
import FilterSelect from "./FilterSelect";
export default {
  name: "app",
  components: {
    CheckboxSelect,
    FilterSelect,
    RadioSelect
  },
  props: ["visible"],
  data() {
    return {
      sortOptions: [
        { label: "Sort by recommended", value: 0 },
        { label: "Sort by high to low", value: 1 },
        { label: "Sort by low to high", value: 2 }
      ],
      sortValue: 0,
      filterOptions: {
        duration: [
          { label: "7 nights", value: 0 },
          { label: "I don't mind", value: 1 }
        ],
        airport: [
          { label: "London(any)", value: 0 },
          { label: "Another airport", value: 1 },
          { label: "Awesome airport", value: 2 },
          { label: "Incredible airport", value: 3 }
        ],
        accomodation: [
          { label: "Neilson Chalet", value: 0, checked: false },
          { label: "Neilson Hotel", value: 1, checked: false },
          { label: "MountainCollection", value: 2, checked: false }
        ],
        boardBasis: [
          { label: "Chalet Board", value: 0, checked: false },
          { label: "All Inclusive", value: 1, checked: false },
          { label: "Bed and Breakfast", value: 2, checked: false },
          { label: "Half Board", value: 3, checked: false },
          { label: "Full Board", value: 4, checked: false },
          { label: "Self Catering", value: 5, checked: false },
          { label: "Club Board", value: 6, checked: false }
        ],
        goodFor: [
          { label: "Families", value: 0, checked: false },
          { label: "Free ski guiding", value: 1, checked: false },
          { label: "Guaranteed snow", value: 2, checked: false },
          { label: "Beginners", value: 3, checked: false },
          { label: "Intermediates", value: 4, checked: false },
          { label: "Advanced", value: 5, checked: false },
          { label: "Snowboarders", value: 6, checked: false },
          { label: "Quiet nightlife", value: 7, checked: false },
          { label: "Lively nightlife", value: 8, checked: false },
          { label: "Swimming Pool", value: 9, checked: false },
          { label: "Spa & Wellness", value: 10, checked: false },
          { label: "Short transfer <2hrs", value: 11, checked: false }
        ],
        resort: [
          {
            label: "Spain",
            checked: false,
            values: [
              { label: "Spain 1", value: 0, checked: false },
              { label: "Spain 2", value: 1, checked: false },
              { label: "Spain 3", value: 2, checked: false }
            ]
          },
          {
            label: "Greece",
            checked: false,
            values: [
              { label: "Greece 1", value: 0, checked: false },
              { label: "Greece 2", value: 1, checked: false },
              { label: "Greece 3", value: 2, checked: false }
            ]
          }
        ]
      },
      filterHasChecked: {
        accomodation: false,
        boardBasis: false,
        goodFor: false,
        resort: false,
        airport: false,
        duration: false
      },
      airportSelected: 0,
      durationSelected: 1
    };
  },
  computed: {
    applyDisabled() {
      return Object.keys(this.filterHasChecked).every(
        key => !this.filterHasChecked[key]
      );
    },
    mobile() {
      return ["xs", "sm", "md"].includes(this.$mq);
    }
  },
  methods: {
    filterOnChange($event, name) {
      const newObject = { ...this.filterHasChecked };
      newObject[name] = $event;
      this.filterHasChecked = newObject;
    }
  }
};
</script>
<style lang="scss" scoped>
.filter-wrapper {
  &.xs,
  &.sm,
  &.md {
    position: relative;
    height: 0;
    width: 100%;
  }
}
.search-filter {
  max-width: 1000px;
  display: grid;
  grid-template-columns: 1fr;
  &.xs,
  &.sm,
  &.md {
    position: sticky;
    top: 0;
    width: 100%;
  }

  &.lg,
  &.xl {
    grid-template-columns: repeat(5, minmax(100px, 1fr)) 81px;
  }
  .button-block {
    display: flex;
    justify-content: flex-end;
    padding: 24px 20px;
    background: white;
    .buttons {
      display: flex;
      button {
        padding: 15px 20px 11px;
        font-weight: bold;
        border: none;
        outline: none;
        font-size: 16px;
        line-height: 24px;
      }
      .apply-button {
        width: 100%;
        background: #f78e1e;
        box-shadow: inset 0 0 0 2px #f78e1e;
        color: white;
      }
      .cancel-button {
        color: #bebebe;
        box-shadow: inset 0 0 0 1px #bebebe;
        background-color: transparent;
        margin-right: 20px;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
