<template>
  <div class="custom-select" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open: open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, i) of options"
        :key="i"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true
    },
    default: {
      type: String,
      required: false,
      default: null
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      selected: this.default
        ? this.default
        : this.options.length > 0
        ? this.options[0]
        : null,
      open: false
    };
  },
  mounted() {
    this.$emit("input", this.selected);
  }
};
</script>

<style lang="scss" scoped>
$borderLight: $orange;
$fontSize: 1rem;
.custom-select {
  font-size: $fontSize;
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  line-height: calc(26px + #{$fontSize});
}

.custom-select .selected {
  background-color: $optionsBackground;
  border-radius: $appRadius;
  border: 1px solid $lineColor;
  color: $white;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .selected.open {
  border: 1px solid $borderLight;
  border-radius: $appRadius $appRadius 0px 0px;
}

.custom-select .selected:after {
  position: absolute;
  content: "";
  top: calc((22px + #{$fontSize}) / 2);;
  right: 1em;
  width: 0;
  height: 0;
  border: calc(#{$fontSize} * 0.3) solid transparent;
  border-color: $black transparent transparent transparent;
}

.custom-select .items {
  color: $white;
  border-radius: 0px 0px $appRadius $appRadius;
  overflow: hidden;
  border-right: 1px solid $borderLight;
  border-left: 1px solid $borderLight;
  border-bottom: 1px solid $borderLight;
  position: absolute;
  background-color: $optionsBackground;
  left: 0;
  right: 0;
  z-index: 1;
}

.custom-select .items div {
  color: $white;
  padding-left: 1em;
  cursor: pointer;
  user-select: none;
}

.custom-select .items div:hover {
  background-color: $borderLight;
}

.selectHide {
  display: none;
}
</style>
