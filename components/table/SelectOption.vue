<template>
  <select @change="$emit('action', toSend)" v-model="toSend.value">
    <option
      v-for="({ value, label }, index) in selectOptions"
      :key="'' + index"
      :value="value"
    >
      {{ label }}
    </option>
  </select>
</template>
<script>
import {getDeepValue} from "~/static/helper.js"
export default {
  props: {
    options: {
      type: Object,
      required: true
    },
    selectOptions: {
      type: Array,
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
      toSend: {
        name: "changeValue",
        field: this.options.field,
        base: this.options.base,
        options: this.options.options,
        row: this.row,
        value: getDeepValue(this.info, this.options.field)
      }
    };
  },
};
</script>
<style lang="scss" scoped>
.link__block {
  background-color: $optionsBackground;
  border-radius: $appRadius;
  color: $white;
  width: 100%;
}
</style>
