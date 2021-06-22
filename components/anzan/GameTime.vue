<template>
  <div class="anzan__game" ref="anzan-game">
    {{ nextNumber(options) }}
  </div>
</template>
<script>
import user from "~/mixins/user.js";
import socket from "~/mixins/sockets.js";
export default {
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  /* beforeMount() {
    setTimeout(() => {
      this.$nextTick(() => {
        const target = this.$refs["anzan-game"];
        const mainHeight = target.parentElement.parentElement.offsetHeight;
        const newFontSize = `${mainHeight / 2}px`;
        target.style.fontSize = newFontSize;
      });
    }, 0);
  }, */
  mounted() {
    if (process.client) {
      let userId;
      if (this.$route.name.startsWith("demo")) {
        userId = this.$route.query.user_id;
      } else {
        userId = this.user.id;
      }
      this.sendResult("game", {
        studentId: userId,
        game: "anzan",
        action: "start",
        samples: [this.game.generatedNumbers],
        demoId: this.$route.query.demo_id
      });
    }
  },
  mixins: [user, socket],
  data() {
    return {
      game: {
        generatedNumbers: [1, 2, 3],
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
      const { generatedNumbers } = game;
      const speed = game.settings.speed * 1000;
      if (generatedNumbers[this.game.currentIndex]) {
        setTimeout(() => {
          ++this.game.currentIndex;
        }, speed);
        const numberToShow = generatedNumbers[this.game.currentIndex];
        const soundEnabled = this.options.settings.sound;
        if (soundEnabled) {
          const soundLang = this.options.settings.lang;
          const msg = new SpeechSynthesisUtterance(
            `${numberToShow < 0 ? "minus " : "+ "}${Math.abs(
              numberToShow
            )}`.toLocaleString(soundLang)
          );
          msg.lang = `${soundLang}-${soundLang.toUpperCase()}`;
          //msg.rate = 2;
          window.speechSynthesis.speak(msg);
        }
        return `${numberToShow < 0 ? "" : "+"}${numberToShow}`;
      } else {
        this.$emit("changeState", {
          state: "anzan-put-result",
          options: {
            ...this.options,
            generatedNumbers: generatedNumbers,
            answer: this.getArraySum(generatedNumbers)
          }
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
  font-size: 35vh;
}
</style>
