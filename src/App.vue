<template>
  <div id="app"
       :class="$mq">
    <div style="height: 500px; background: gray; width: 100%;"></div>
    <SearchFilter :visible="filterContentVisible"
                  @cancel="hideFilter"></SearchFilter>
    <div style="height: 500px; background: gray; width: 100%;"></div>
    <div style="height: 500px; background: gray; width: 100%;"></div>
    <div style="height: 500px; background: gray; width: 100%;"></div>
    <div style="height: 500px; background: gray; width: 100%;"></div>
    <MobileFilterPanel @click="showFilter"
                       :visible="['xs', 'sm', 'md'].includes($mq) && filterPanelVisible"></MobileFilterPanel>
    <div style="height: 500px; background: gray; width: 100%;"></div>
    <div style="height: 500px; background: gray; width: 100%;"></div>

  </div>
</template>

<script>
import MobileFilterPanel from "./components/MobileFilterPanel";
import SearchFilter from "./components/SearchFilter";

export default {
  name: "app",
  components: {
    MobileFilterPanel,
    SearchFilter
  },
  data() {
    return {
      filterPanelVisible: false,
      filterContentVisible: false
    };
  },
  methods: {
    handleScroll() {
      this.filterPanelVisible = true;
    },
    showFilter() {
      this.filterContentVisible = true;
      this.filterPanelVisible = false;
      window.removeEventListener("scroll", this.handleScroll);
    },
    hideFilter() {
      this.filterContentVisible = false;
      this.filterPanelVisible = true;
      window.addEventListener("scroll", this.handleScroll);
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}

#app {
  &.xs,
  &.sm,
  &.md {
    height: 2000px;
    position: relative;
  }
  .filter {
    height: 1000px;
  }
}

@font-face {
  font-family: "Neilsonicons";
  src: url("https://www.neilson.co.uk/themes/custom/neilsontheme/dist/assets/fonts/Neilsonicons.woff")
    format("woff");
}
</style>
