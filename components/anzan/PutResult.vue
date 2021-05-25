<template>
  <form
    @submit="
      $emit('changeState', {
        state: 'anzan-result',
        options: {...options, correct }
      })
    "
    class="result"
  >
    <span>{{$t('general.answer')}}</span>
    <input
      class="result__input"
      type="text"
      v-model="yourAnswer"
      inputmode="numeric"
    />
    <button type="submit" class="result__button">
      {{$t('general.check')}}
    </button>
  </form>
</template>
<style lang="scss" scoped>
.result {
  align-items: center;
  font-size: 1.5rem;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.result__input {
  background-color: $grayedWhite;
  border: none;
  border-radius: $appRadius;
  font-size: 2rem;
  margin: 2rem 0;
  outline: none;
  padding: 1rem;
  text-align: center;
  width: 12rem;
}
.result__button {
  background-color: $optionsBackground;
  border: none;
  border-radius: $appRadius;
  color: $white;
  cursor: pointer;
  font-size: 1rem;
  min-width: 2rem;
  outline: none;
  padding: 0.625rem;
}
.result__button:hover {
  background-color: darken($optionsBackground, 15%);
}
.result__button:active {
  transform: scale(0.95);
}
</style>
<script>
export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
    correct() {
      return this.options.answer === +this.yourAnswer;
    }
  },
  data() {
    return {
      yourAnswer: null
    };
  }
};
</script>
