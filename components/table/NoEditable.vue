<template>
  <input
    readonly
    class="no-editable__input"
    :value="toSend.value"
  />
</template>
<script>
import { getDeepValue } from "~/static/helper.js";
export default {
  props: {
    options: {
      type: Object,
      required: true
    },
    info: {
      type: Object,
      required: true
    },
    row: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      readonly: true,
      toSend: {
        value: getDeepValue(this.info, this.options.field)
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.no-editable__input {
  background-color: transparent;
  border: none;
  color: $white;
  cursor: default;
  font-size: 100%;
  height: 100%;
  text-align: center;
  text-overflow: ellipsis;
  width: 6rem;
  white-space: nowrap;
}
.no-editable__input:focus {
  outline: none;
}
</style>
