<template>
  <button
    class="action__button"
    :class="toSend.value ? 'action__button--disabed' : 'action__button--active'"
    @click="action()"
    :disabled="toSend.value"
  >
    <fa
      class="result__icon"
      :icon="toSend.value ? 'check' : 'paper-plane'"
      :disabled="toSend.value"
    />
  </button>
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
      toSend: {
        name: "changeValue",
        field: this.options.field,
        row: this.row,
        value: getDeepValue(this.info, this.options.field)
      }
    };
  },
  methods: {
    action() {
      console.log(`Wysyłam do ${this.toSend.value}! :)`);
      this.toSend.value = true;
      this.$emit("action", this.toSend);
    }
  }
};
</script>
<style lang="scss" scoped>
.action__button {
  background-color: transparent;
  border: none;
  border-radius: $appRadius;
  color: $white;
  width: 100%;
  height: 100%;
}
.action__button--active:hover {
  cursor: pointer;
}
.action__button--disabed {
  color: $green;
}
</style>
