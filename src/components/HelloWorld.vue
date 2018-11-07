<template>
  <div class="filter">
    <div class="first">
      <Multiselect :showLabels="false" v-model="filter.first" track-by="value" label="label" placeholder="Select one" :options="optionsFirst" :searchable="false" :allow-empty="false" :option-height="61">
        <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.label }}</strong></template>
        <template slot="caret">
          <span class="caret">
            <font-awesome-icon icon="angle-down" />
          </span>
        </template>
      </Multiselect>
    </div>
    <div class="second">
      <v-select :searchable="false" placeholder="select" :options="optionsFirst"></v-select>
    </div>
    <div class="third">
      <v-select :searchable="false" placeholder="select" :options="optionsFirst"></v-select>
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
export default {
  components: { Multiselect },
  data() {
    return {
      optionsFirst: [
        { label: "Sort by: recommended", value: 0 },
        { label: "Sort by: low to high", value: 1 },
        { label: "Sort by: high to low", value: 2 }
      ],
      filter: {
        first: { label: "Sort by: recommended", value: 0 }
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.filter {
  display: grid;
  grid-template-areas: "first second third";
}
.first {
  grid-area: first;
}
.second {
  grid-area: second;
}
.third {
  grid-area: third;
}

.caret {
    position: absolute;
    right: 10px;
    font-size: 25px;
    top: 7px;
}
</style>
