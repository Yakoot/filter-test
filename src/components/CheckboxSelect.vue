<template>
  <div class="checkbox-select" v-click-outside="hide">
    <div class="button-wrapper" :class="{'has-checked': hasChecked}" @click="dropIt">
      <button>{{ label }}</button>
      <div class="arrow" :class="{active: isDropped}"></div>
    </div>
    <transition name="slide">
      <div class="dropdown" v-if="isDropped && !tree">
        <ul class="list">
          <li v-for="item in options" :key="item.value">
            <FilterCheckbox :id="item.value" :label="item.label" v-model="item.checked" @input="checkHasChecked" />
          </li>
        </ul>
      </div>
      <div class="dropdown" v-if="isDropped && tree">
        <ul class="list" v-for="(item, index) in options" :key="createId(item.label, index)">
          <li class="parent">
            <FilterCheckbox :id="createId(item.label)" :label="item.label" v-model="item.checked" @input="changeAll($event, item.values)" />
          </li>
          <li class="child" v-for="option in item.values" :key="createId(option.label, option.value)">
            <FilterCheckbox :id="createId(option.label, option.value)" :label="option.label" v-model="option.checked" @input="changeOne($event, item)" />
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import FilterCheckbox from "./FilterCheckbox";
import ClickOutside from "vue-click-outside";

export default {
  components: { FilterCheckbox },
  directives: {
    ClickOutside
  },
  props: ["options", "label", "tree"],
  data: () => ({
    isDropped: false,
    hasChecked: false
  }),
  computed: {},
  watch: {
    options() {
      this.hasChecked = this.isChecked();
    }
  },
  methods: {
    dropIt() {
      this.isDropped = !this.isDropped;
    },
    hide() {
      this.isDropped = false;
    },
    createId(name, index) {
      return name.replace(/\W/, "") + "-" + index;
    },
    changeAll($event, items) {
      items.forEach(item => {
        item.checked = $event;
      });
      this.checkHasChecked();
    },
    changeOne($event, item) {
      if (item.checked && !$event) {
        item.checked = false;
      }
      if (!item.checked && $event) {
        const countChecked = item.values.filter(value => value.checked).length;
        if (countChecked === item.values.length) {
          item.checked = true;
        }
      }
      this.checkHasChecked();
    },
    checkHasChecked() {
      let totalValues = this.options;
      if (this.tree) {
        totalValues = [];
        this.options.forEach(option => {
          totalValues = [...totalValues, ...option.values];
        });
      }
      this.hasChecked = totalValues.filter(item => item.checked).length > 0;
      this.$emit("change", this.hasChecked);
    }
  }
};
</script>

<style lang="scss" scoped>
.checkbox-select {
  position: relative;
  width: 186px;
  margin-left: -2px;
  .button-wrapper {
    position: relative;
    cursor: pointer;
    button {
      padding: 20px 60px;
      width: 100%;
      height: 60px;
      border: 3px solid #f3f3f3;
      background: white;
      outline: none;
      padding-left: 10px;
      padding-right: 55px;
      text-align: left;
      cursor: pointer;
    }
    .arrow {
      position: absolute;
      right: 10px;
      top: 0;
      height: 60px;
      display: flex;
      align-items: center;
      width: 20px;
      background-image: url(https://www.neilson.co.uk/themes/custom/neilsontheme/dist/assets/img/icons/down_arrow_orange.svg);
      background-repeat: no-repeat;
      background-position: center;
      transition: transform 0.3s ease;
      &.active {
        transform: rotate(-180deg);
      }
    }
    &.has-checked::after {
      content: "c";
      font-family: Neilsonicons !important;
      position: absolute;
      top: 0;
      right: 35px;
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 20px;
      color: #f78e1e;
    }
  }
  .dropdown {
    position: absolute;
    top: 58px;
    left: 0;
    margin: 0;
    padding: 0;
    transform-origin: top;
    transition: transform 0.4s ease-in-out;
    border: 2px solid #ececec;
    background: white;
    width: max-content;
    min-width: 100%;
    overflow: hidden;
    box-shadow: 0 2px 4px 0 rgba(164, 172, 177, 0.502);
  }
  .list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    li {
      text-align: left;
      padding: 10px;
      &.child {
        margin-left: 40px;
      }
    }
  }
}
.slide-enter,
.slide-leave-to {
  transform: scaleY(0);
}
</style>
