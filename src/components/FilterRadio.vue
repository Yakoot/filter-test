<template>
  <div class="filter-radio-wrapper"
       :class="$mq">
    <input class="filter-radio"
           :name="name"
           :id="radioId"
           type="radio"
           :value="radioValue"
           v-model="currentValue"
           @change="$emit('change', currentValue)">
    <label :for="radioId">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: ["radioValue", "value", "id", "label", "name"],
  data() {
    return {
      currentValue: this.value
    };
  },
  computed: {
    radioId() {
      return `filter-radio-${this.id}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-radio {
  position: absolute; // take it out of document flow
  opacity: 0; // hide it
  font-family: Neilsonicons !important;

  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
    font-size: 15px;
  }

  // Box.
  & + label:before {
    content: "";
    margin-right: 10px;
    display: inline-block;
    vertical-align: middle;
    text-align: center;
    width: 15px;
    height: 15px;
    border: 2px solid #a4acb1;
    background: transparent;
    border-radius: 10px;
    margin-top: -2px;
  }

  // Checkmark.
  &:checked + label:before {
    content: "\63";
    font-family: Neilsonicons !important;
    left: 5px;
    top: 9px;
    background: white;
    border-color: #2b5b71;
    color: #2b5b71;
    line-height: 15px;
    font-size: 17px;
    display: inline-flex;
    justify-content: center;
  }
}
</style>
