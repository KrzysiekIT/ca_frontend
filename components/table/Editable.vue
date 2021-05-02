<template>
  <input
    :readonly="readonly"
    class="editable__input"
    @change="$emit('action', toSend)"
    @focus="readonly = false"
    @blue="readonly = true"
    v-model="toSend.value"
    placeholder="Wpisz dane"
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
        name: "changeValue",
        field: this.options.field,
        row: this.row,
        value: getDeepValue(this.info, this.options.field)
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.editable__input {
  background-color: transparent;
  border: none;
  color: $white;
  font-size: 100%;
  height: 100%;
  text-align: center;
  text-overflow: ellipsis;
  width: 6rem;
  white-space: nowrap;
}
.editable__input:focus {
  outline: none;
}
</style>
