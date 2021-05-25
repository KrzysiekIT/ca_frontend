<template>
  <div class="anzan__game" ref="anzan-game">
    {{ nextNumber(game) }}
  </div>
</template>
<script>
import soroban from "~/mixins/soroban.js";
export default {
  beforeMount() {
    setTimeout(() => {
      this.$nextTick(() => {
        const target = this.$refs["anzan-game"];
        const mainHeight = target.parentElement.parentElement.offsetHeight;
        const newFontSize = `${mainHeight / 2}px`;
        target.style.fontSize = newFontSize;
      });
    }, 0);
  },
  mixins: [soroban],
  data() {
    return {
      game: {
        generatedNumbers: [1, -211, 3],
        currentIndex: 0,
        speed: 1000
      }
    };
  },
  methods: {
    getArraySum(sumArray) {
      return sumArray.reduce(
        (factorLeft, factorRight) => factorLeft + factorRight,
        0
      );
    },
    nextNumber(game) {
      const { generatedNumbers, speed } = game;
      if (generatedNumbers[game.currentIndex]) {
        setTimeout(() => {
          ++game.currentIndex;
        }, speed);
        const numberToShow = generatedNumbers[game.currentIndex];
        const msg = new SpeechSynthesisUtterance(`${numberToShow < 0 ? "- " : "+"}${numberToShow}`.toLocaleString('pl'));
        msg.lang = "pl-PL";
        //msg.rate = 2;
        window.speechSynthesis.speak(msg);
        return `${numberToShow < 0 ? "" : "+"}${numberToShow}`;
      } else {
        this.$emit("changeState", {
          state: "anzan-put-result",
          options: { answer: this.getArraySum(game.generatedNumbers) }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.anzan__game {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}
</style>
