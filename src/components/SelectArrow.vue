<template>
  <div>
    <mq-layout mq="lg+">
      <div class="arrow desktop"
           :class="{active: active, 'has-checked': hasChecked}"></div>
    </mq-layout>
    <mq-layout :mq="['xs', 'sm', 'md']">
      <transition name="slide">
        <div class="arrow mobile"
             key="1"
             v-if="!hasChecked"
             :class="{active}"></div>
        <div class="arrow mobile"
             key="2"
             v-else
             :class="[{active}, 'has-checked']"></div>
      </transition>
    </mq-layout>
  </div>
</template>

<script>
export default {
  props: ["active", "has-checked"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.arrow {
  &.mobile {
    height: 60px;
    display: inline-flex;
    align-items: center;
    width: 20px;
    position: absolute;
    right: 10px;
    top: 0;
    transition: transform 0.3s ease;
    &::before {
      content: "\64";
      font-family: Neilsonicons !important;
      color: #f78e1e;
      transform: rotate(-135deg);
      transition: transform 0.3s ease;
    }
    &.active::before {
      transform: rotate(0);
    }
    &.has-checked::before {
      content: "\42";
      transform: none;
    }
  }
  &.desktop {
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
}
.slide-enter-active {
  transform: translateY(0);
}
.slide-leave-active {
  transform: translateY(0);
}
.slide-enter {
  opacity: 0;
  transform: translateY(20px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
