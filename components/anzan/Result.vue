<template>
  <div class="result">
    <header class="result__header">
      <img
        src="~/assets/images/congratulations.png"
        alt="Home icon"
        height="56"
        v-if="correct"
      />
      <span class="result__title" v-else>
        BŁĄD
      </span>
    </header>
    <div
      class="result__button-box"
      v-for="({ icon, toSend, label, modifier }, index) in currentButtons"
      :key="'button' + index"
    >
      <div :class="`result__icon-box result__icon-box--${icon.modifier}`">
        <fa class="result__icon" :icon="icon.name" />
      </div>
      <button
        @click="$emit('changeState', { ...toSend, options: options })"
        :class="`result__button result__button--${modifier}`"
        v-if="label !== 'WYŚWIETL'"
      >
        {{ label }}
      </button>
      <button
        @click="showResults = true"
        :class="`result__button result__button--${modifier}`"
        v-else
      >
        {{ label }}
      </button>
    </div>
    <div class="result__numbers" v-if="showResults">
      {{ options.generatedNumbers.join(", ") }}
    </div>
  </div>
</template>
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
      return this.options.correct;
    },
    currentButtons() {
      return this.buttons.filter(({ correct }) =>
        correct.includes(this.correct)
      );
    }
  },
  mounted() {
    window.speechSynthesis.cancel();
  },
  data() {
    return {
      showResults: false,
      buttons: [
        {
          label: "JESZCZE RAZ",
          modifier: "correct",
          icon: { name: "redo", modifier: "correct" },
          toSend: {
            state: "anzan-count-down",
            replay: true
          },
          correct: [false]
        },
        {
          label: "WYŚWIETL",
          modifier: "wrong",
          icon: { name: "question", modifier: "wrong" },
          toSend: {
            state: "anzan-count-down"
          },
          correct: [false]
        },
        {
          label: "NASTĘPNE",
          modifier: this.options.correct ? "correct" : "default",
          icon: {
            name: "arrow-right",
            modifier: this.options.correct ? "correct" : "default"
          },
          toSend: {
            state: "anzan-count-down",
            replay: false
          },
          correct: [false, true]
        },
        {
          label: "WSTECZ",
          modifier: "default",
          icon: { name: "arrow-left", modifier: "default" },
          toSend: {
            state: "anzan-settings"
          },
          correct: [false, true]
        }
      ]
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
.result__header {
  margin-bottom: 2rem;
}
.result__title {
  color: $yellow;
  font-size: 2rem;
}
.result__button-box {
  align-items: center;
  display: flex;
  margin: 0.25rem;
}
.result__button {
  border: none;
  border-radius: $appRadius;
  color: $white;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 0.5rem;
  min-width: 8rem;
  outline: none;
  padding: 0.625rem;
}
.result__button:active {
  transform: scale(0.95);
}
.result__button--default {
  background-color: $resultNeutralBlue;
}
.result__button--default:hover {
  background-color: darken($resultNeutralBlue, 15%);
}
.result__button--correct {
  background-color: $resultCorrect;
}
.result__button--correct:hover {
  background-color: darken($resultCorrect, 15%);
}
.result__button--wrong {
  background-color: $resultMistake;
}
.result__button--wrong:hover {
  background-color: darken($resultMistake, 15%);
}
.result__icon-box {
  align-items: center;
  border-radius: 50%;
  display: flex;
  height: 2.25rem;
  justify-content: center;
  width: 2.25rem;
}
.result__icon-box--default {
  border: 0.25rem solid $resultNeutralGray;
  color: $resultNeutralGray;
}
.result__icon-box--correct {
  border: 0.25rem solid $resultCorrect;
  color: $resultCorrect;
}
.result__icon-box--wrong {
  border: 0.25rem solid $resultMistake;
  color: $resultMistake;
}
.result__icon {
  transform: scale(0.85);
}
.result__numbers {
  margin-top: 2rem;
}
</style>
