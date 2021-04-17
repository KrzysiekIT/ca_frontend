<template>
  <div class="result">
    <img src="~/assets/images/congratulations.png" alt="Home icon" height="56" />

    <button
      @click="$emit('changeState', 'anzan-put-result')"
      class="result__button result__button--correct"
    >
      NASTĘPNE<div class="result__icon">➜</div>
    </button>
    <div>
      <fa icon="redo" /><fa icon="arrow-alt-circle-left" /><fa
        icon="arrow-alt-circle-right"
      />
      <fa icon="question-circle" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      correct: true
    };
  }
};
</script>
<style lang="scss" scoped>
.result {
  align-items: center;
  font-size: 1.5rem;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.result__button {
  border: none;
  border-radius: $appRadius;
  color: $white;
  cursor: pointer;
  font-size: 1rem;
  min-width: 8rem;
  outline: none;
  padding: 0.625rem;
}
.result__button:active {
  transform: scale(0.95);
}
.result__button--default {
  background-color: $optionsBackground;
}
.result__button--default:hover {
  background-color: darken($optionsBackground, 15%);
}
.result__button--correct {
  background-color: $green;
}
.result__button--correct:hover {
  background-color: darken($green, 15%);
}
</style>
