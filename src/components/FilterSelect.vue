<template>
  <div class="filter-select" :class="$mq" v-click-outside="hide">
    <div class="button-wrapper" @click="dropIt">
      <button :class="$mq">{{ selectedLabel }}</button>
      <div class="arrow" :class="{active: isDropped}"></div>
    </div>
    <transition name="expand">
      <div class="dropdown" :class="$mq" v-show="isDropped">
        <ul class="list">
          <li v-for="item in selectOptions" :key="item.value" @click="onClick(item.value)">
            {{ item.label }}
          </li>
        </ul>
      </div>
    </transition>
  </div>

</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  directives: {
    ClickOutside
  },
  props: ["options", "value"],
  data() {
    return {
      isDropped: false,
      selected: this.value
    };
  },
  computed: {
    selectedLabel() {
      return this.options.find(item => item.value === this.selected).label;
    },
    selectOptions() {
      return this.options.filter(item => item.value !== this.selected);
    }
  },
  methods: {
    dropIt() {
      this.isDropped = !this.isDropped;
    },
    onClick(value) {
      this.selected = value;
      this.$emit("input", value);
      this.isDropped = false;
    },
    hide() {
      this.isDropped = false;
    }
  }
};
</script>


<style lang="scss" scoped>
.filter-select {
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
      padding-right: 25px;
      text-align: left;
      cursor: pointer;
      &.lg,
      &.xl {
        border: 3px solid #f3f3f3;
      }
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
      transition: transform 0.3s ease-out;
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
      transition: transform 0.3s ease-in-out;
    }
  }
  .list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    li {
      text-align: left;
      padding: 10px;
      cursor: pointer;
      &:hover {
        background: #ececec;
      }
    }
  }
}
</style>
