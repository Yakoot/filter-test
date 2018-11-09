<template>
  <div id="app" class="search-filter" :class="$mq">
    <FilterSelect :options="sortOptions" v-model="sortValue"></FilterSelect>
    <CheckboxSelect :options="filterOptions.accomodation" @change="filterOnChange($event, 'accomodation')" label="Accommodation"></CheckboxSelect>
    <CheckboxSelect :options="filterOptions.boardBasis" @change="filterOnChange($event, 'boardBasis')" label="Board basis"></CheckboxSelect>
    <CheckboxSelect :options="filterOptions.goodFor" @change="filterOnChange($event, 'goodFor')" label="Good for"></CheckboxSelect>
    <CheckboxSelect :options="filterOptions.resort" @change="filterOnChange($event, 'resort')" label="Country/Resort" :tree="true"></CheckboxSelect>
    <button class="apply-button" :disabled="applyDisabled">Apply</button>
  </div>
</template>

<script>
import CheckboxSelect from "./components/CheckboxSelect";
import FilterSelect from "./components/FilterSelect";

export default {
  name: "app",
  components: {
    CheckboxSelect,
    FilterSelect
  },
  data() {
    return {
      sortOptions: [
        { label: "Sort by recommended", value: 0 },
        { label: "Sort by high to low", value: 1 },
        { label: "Sort by low to high", value: 2 }
      ],
      sortValue: 0,
      filterOptions: {
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
        resort: false
      }
    };
  },
  methods: {
    filterOnChange($event, name) {
      const newObject = { ...this.filterHasChecked };
      newObject[name] = $event;
      this.filterHasChecked = newObject;
    }
  },
  computed: {
    applyDisabled() {
      return Object.keys(this.filterHasChecked).every(
        key => !this.filterHasChecked[key]
      );
    }
  }
};
</script>

<style lang="scss">
  /* #app { */
    /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
    /* -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center; */
  /* } */

  @font-face {
    font-family: "Neilsonicons";
    src: url("https://www.neilson.co.uk/themes/custom/neilsontheme/dist/assets/fonts/Neilsonicons.woff")
      format("woff");
  }

  .search-filter {
    max-width: 1000px;
    display: grid;
    grid-template-columns: repeat(5, minmax(100px, 1fr)) 81px;
    .apply-button {
      width: 100%;
    }
  }
</style>
