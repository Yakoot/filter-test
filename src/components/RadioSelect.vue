<template>
  <div class="radio-select"
       :class="$mq | mq({ xs: 'mobile', lg: 'desktop' })"
       v-click-outside="hide">
    <div class="button-wrapper"
         @click="dropIt">
      <button>{{ label }}</button>
      <SelectArrow :active="isDropped" :has-checked="hasChecked"/>
    </div>
    <transition name="expand">
      <div class="dropdown"
           v-if="isDropped">
        <ul class="list"
            :class="[display === 'cols' ? 'cols' : 'wrap']">
          <li v-for="(item, index) in options"
              :key="createKey(item.label, index)">
            <FilterRadio :name="name"
                         :id="createKey(item.label, index)"
                         :label="item.label"
                         :radioValue="item.value"
                         :value="currentValue"
                         @change="onChange" />
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import FilterRadio from "./FilterRadio";
import SelectArrow from "./SelectArrow";
import ClickOutside from "vue-click-outside";

export default {
  components: { FilterRadio, SelectArrow },
  directives: {
    ClickOutside
  },
  props: ["options", "label", "name", "value", "display"],
  data() {
    return {
      isDropped: false,
      initialValue: this.value,
      currentValue: this.value
    };
  },
  computed: {
    hasChecked() {
      return this.initialValue !== this.currentValue;
    }
  },
  methods: {
    dropIt() {
      this.isDropped = !this.isDropped;
    },
    hide() {
      if (["lg", "xl"].includes(this.$mq)) {
        this.isDropped = false;
      }
    },
    createKey(value, index) {
      return `${this.name}-li-${value.replace(/\W/, "")}-${index}`;
    },
    onChange($event) {
      this.currentValue = $event;
      this.$emit("change", this.hasChecked);
      this.$emit("input", $event);
    }
  }
};
</script>

<style lang="scss" scoped>
.radio-select {
  margin: 0;
  position: unset;
  width: 100%;
  border-bottom: 3px solid #f3f3f3;
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
    }
  }
  .dropdown {
    margin: 0;
    padding: 0;
    background: white;
    width: 100%;
  }
  .list {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    &.cols {
      li {
        flex: 50%;
        display: flex;
        justify-content: center;
      }
    }
    &.wrap {
      flex-wrap: wrap;
    }
    li {
      text-align: left;
      padding: 10px;
    }
  }

  // Mobile version
  &.mobile {
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
    .button-wrapper {

    }
  }

  // Desktop version
  &.desktop {
    position: relative;
    border: none;
    .expand-enter,
    .expand-leave-to {
      transform: scaleY(0);
    }
    .button-wrapper {
      button {
        &.desktop {
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
      &.desktop {
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
  }
}
</style>
