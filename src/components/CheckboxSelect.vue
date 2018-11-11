<template>
  <div class="checkbox-select" :class="$mq" v-click-outside="hide">
    <div class="button-wrapper" :class="{'has-checked': hasChecked}" @click="dropIt">
      <button :class="$mq">{{ label }}</button>
      <SelectArrow :active="isDropped" :has-checked="hasChecked"/>
    </div>
    <transition name="expand">
      <div class="dropdown" :class="$mq" v-if="isDropped && !tree">
        <ul class="list">
          <li v-for="item in options" :key="item.value">
            <FilterCheckbox :id="item.value" :label="item.label" v-model="item.checked" @input="checkHasChecked" />
          </li>
        </ul>
      </div>
      <div class="dropdown" :class="$mq" v-if="isDropped && tree">
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
import SelectArrow from "./SelectArrow";
import ClickOutside from "vue-click-outside";

export default {
  components: { FilterCheckbox, SelectArrow },
  directives: {
    ClickOutside
  },
  props: ["options", "label", "tree"],
  data: () => ({
    isDropped: false,
    hasChecked: false
  }),
  methods: {
    dropIt() {
      this.isDropped = !this.isDropped;
    },
    hide() {
      if (["lg", "xl"].includes(this.$mq)) {
        this.isDropped = false;
      }      
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
  margin: 0;
  position: unset;
  width: 100%;
  border-bottom: 3px solid #f3f3f3;
  &.xs,
  &.sm,
  &.md {
    .expand-enter-active,
    .expand-leave-active {
      transition: all 0.3s ease-in;
      max-height: 500px;
    }
    .expand-enter,
    .expand-leave-to {
      max-height: 0;
      transition: all 0.3s ease-out;
      overflow: hidden;
      padding: 0;
      opacity: 0;
    }
  }
  &.lg,
  &.xl {
    position: relative;
    border: none;
    .expand-enter,
    .expand-leave-to {
      transform: scaleY(0);
    }
  }
  .button-wrapper {
    position: relative;
    cursor: pointer;
    button {
      width: 100%;
      height: 60px;
      border: none;
      background: white;
      outline: none;
      padding-left: 10px;
      padding-right: 55px;
      text-align: left;
      cursor: pointer;
      &.lg,
      &.xl {
        border: 3px solid #f3f3f3;
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
    margin: 0;
    padding: 0;
    background: white;
    width: 100%;
    &.lg,
    &.xl {
      position: absolute;
      top: 58px;
      left: 0;
      width: max-content;
      min-width: 100%;
      border: 2px solid #ececec;
      box-shadow: 0 2px 4px 0 rgba(164, 172, 177, 0.502);
      transform-origin: top;
      transition: transform 0.4s ease-in-out;
    }
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
</style>
