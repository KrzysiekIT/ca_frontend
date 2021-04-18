<template>
  <nuxt-link :to="`${options.to}${getDeepValue(info, options.field)}`">
    <div class="link__block"><fa class="result__icon" icon="link" /></div>
  </nuxt-link>
</template>
<script>
export default {
  props: {
    options: {
      type: Object,
      required: true
    },
    info: {
      type: Object,
      required: true
    }
  },
  methods: {
    getDeepValue(sourceObject, fields) {
      let value = sourceObject;
      const fieldsLength = fields.length;
      let fieldIndex = 0;
      for (fieldIndex; fieldIndex < fieldsLength; fieldIndex++) {
        value = value[fields[fieldIndex]];
      }
      return value;
    }
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
