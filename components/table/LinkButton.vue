<template>
  <nuxt-link :to="`${options.to}${value}`">
    <div class="link__block"><fa class="result__icon" icon="link" /></div>
  </nuxt-link>
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
    }
  },
  data() {
    return {
      value: getDeepValue(this.info, this.options.field)
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
