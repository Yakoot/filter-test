<template>
  <transition name="asd">
    <div class="mobile-filter-panel" :key="'filter-panel'"
         @click="$emit('click')"
         v-if="visible">
      <span>Filter your search</span>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["visible"]
};
</script>
<style lang="scss" scoped>
.mobile-filter-panel {
  position: sticky;
  bottom: 0;
  padding: 0 20px;
  background-color: #204353;
  box-shadow: inset 0 0 0 1px #204353;
  color: #fff;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &::after {
    content: "\6a";
    font-size: 20px;
    font-family: Neilsonicons !important;
  }
  span {
    font-size: 18px;
  }
}
.asd-enter-active {
  transform: translateY(0) !important;
}
.asd-enter {
  transform: translateY(50px) !important;
  transition: all 1s ease;
}
</style>
