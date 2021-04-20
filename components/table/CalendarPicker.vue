<template>
  <client-only>
    <v-date-picker
      v-model="toSend.value"
      :masks="masks"
      @input="$emit('action', toSend)"
    >
      <template v-slot="{ inputValue, inputEvents }">
        <input :value="inputValue" v-on="inputEvents" class="date__input" />
      </template>
    </v-date-picker>
  </client-only>
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
      masks: { input: "DD.MM.YYYY" },
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
.date__input {
  width: 100%;
}
</style>
