<template>
  <div class="filter-select" v-click-outside="hide">
    <div class="button-wrapper" @click="dropIt">
      <button>{{ selectedLabel }}</button>
      <div class="arrow" :class="{active: isDropped}"></div>
    </div>
    <transition name="slide">
      <div class="dropdown" v-if="isDropped">
        <ul class="list">
          <li v-for="item in selectOptions" :key="item.value" @click="onClick(item.value)">
            <strong>{{ item.label }}</strong>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["options", "value"],
  data() {
    return {
      isDropped: false,
      selected: this.value
    }    
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
    }
  }
};
</script>


<style lang="scss" scoped>
.filter-select {
  position: relative;
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
      cursor: pointer;
      &:hover {
        background: #ececec;
      }
    }
  }
}
.slide-enter,
.slide-leave-to {
  transform: scaleY(0);
}
</style>
