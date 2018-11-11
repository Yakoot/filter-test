<template>
  <div class="filter-checkbox-wrapper" :class="$mq">
    <input class="filter-checkbox" :id="checkboxId" type="checkbox" v-model="checkboxValue" @change="$emit('input', checkboxValue)">
    <label :for="checkboxId">{{ label }}</label>
  </div>
</template>

<script>
export default {
  props: ["value", "id", "label"],
  data() {
    return {
      checkboxValue: this.value
    };
  },
  computed: {
    checkboxId() {
      return `filter-checkbox-${this.id}`;
    }
  },
  watch: {
    value(newValue) {
      this.checkboxValue = newValue;
    }
  }
};
</script>

<style lang="scss" scoped>
.filter-checkbox {
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
    border-radius: 2px;
    margin-top: -2px;
  }

  // Checkmark.
  &:checked + label:before {
    content: "\63";
    content: "B";
    font-family: Neilsonicons !important;
    left: 5px;
    top: 9px;
    background: #2b5b71;
    border-color: #2b5b71;
    color: white;
    line-height: 15px;
    font-size: 12px;
  }

  &.lg,
  &.xl {
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
      border-radius: 2px;
      margin-top: -2px;
    }

    // Checkmark.
    &:checked + label:before {
      content: "B";
      font-family: Neilsonicons !important;
      left: 5px;
      top: 9px;
      background: #2b5b71;
      border-color: #2b5b71;
      color: white;
      line-height: 15px;
      font-size: 12px;
    }
  }
}
</style>
