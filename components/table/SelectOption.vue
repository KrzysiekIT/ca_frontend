<template>
  <select @change="$emit('action', toSend)" v-model="toSend.value">
    <option
      v-for="({ value, label }, index) in options.options"
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
