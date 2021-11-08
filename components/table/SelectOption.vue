<template>
  <select @change="$emit('action', toSend)" v-model="toSend.value">
    <option
      v-for="({ value, label }, index) in filteredOptions"
      :key="'' + index"
      :value="value"
    >
      {{ label }}
    </option>
  </select>
</template>
<script>
import { getDeepValue } from "~/static/helper.js";
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
  computed: {
    filteredOptions: function() {
      const shouldFilter = !!this.options?.selectFilter;
      const shouldFilterTwice = !!this.options?.selectFilterSecond;
      const shouldChangeLabel = !!this.options?.newLabelField;
      let filtered = this.selectOptions;
      if (shouldFilter) {
        const { optionsFields, infoFields } = this.options.selectFilter;
        const requiredInfoValue = getDeepValue(this.info, infoFields);
        filtered = filtered.filter(
          el => el[optionsFields] === requiredInfoValue
        );
      }
      if (shouldFilterTwice) {
        const { optionsFields, infoFields } = this.options.selectFilterSecond;
        const requiredInfoValue = getDeepValue(this.info, infoFields);
        filtered = filtered.filter(
          el => el[optionsFields] === requiredInfoValue
        );
      }
      if (shouldChangeLabel) {
        const newLabelField = this.options?.newLabelField;
        filtered = filtered.map(options => {
          return { ...options, label: options[newLabelField] };
        });

        const selectedId = getDeepValue(this.info, this.options.field);
        const selectedOptionsIndex = filtered.findIndex(
          el => el.id === selectedId
        );
        const removedDuplicates = [filtered[selectedOptionsIndex]];
        const duplicates = [filtered[selectedOptionsIndex].label];
        for (let i = 0; i < filtered.length; i++) {
          const fieldLabel = filtered[i][newLabelField];
          if (duplicates.includes(fieldLabel)) {
            continue;
          }
          duplicates.push(fieldLabel);
          removedDuplicates.push(filtered[i]);
        }
        filtered = removedDuplicates;
      }
      return filtered;
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
  }
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
