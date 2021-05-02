<template>
  <button
    class="action__button"
    :class="`action__button--${options.states[state].classModifier}`"
    @click="action()"
    :disabled="options.states[state].disabed"
  >
    <fa
      class="result__icon"
      :icon="options.states[state].icon"
      :disabled="options.states[state].disabed"
      :pulse="options.states[state].animation"
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
        name: this.options.action,
        field: this.options.field,
        row: this.row,
        value: getDeepValue(this.info, this.options.field)
      },
      state:
        !!getDeepValue(this.info, this.options.field) ===
        !!this.options.activeState
          ? "active"
          : "disabled"
    };
  },
  methods: {
    async action() {
      this.state = "loading";
      await this[this.options.toExecute]();
      this.state = "disabled";
      this.toSend.value = this.options.newValue;
      this.$emit("action", this.toSend);
    },
    async sendEmail() {
      console.log("FAKE EMAIL SENT.");
    },
    async remove() {
      const userId = this.info.id;
      await this.$store.dispatch("auth/request", {
        method: "delete",
        url: `${this.options.link}/${userId}`
      });
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
.action__button--success {
  color: $green;
}
.action__button--remove {
  color: $resultMistake;
}
.action__button--remove:hover {
  cursor: pointer;
}
</style>
