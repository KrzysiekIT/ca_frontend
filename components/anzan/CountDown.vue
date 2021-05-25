<template>
  <div class="anzan__count-down" ref="anzan-count-down">
    {{ countTime() }}
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
  mounted() {
    this.$emit("generate");
  },
  /* beforeMount() {
    setTimeout(() => {
      this.$nextTick(() => {
        const target = this.$refs["anzan-count-down"];
        const mainHeight = target.parentElement.parentElement.offsetHeight;
        const newFontSize = `${mainHeight / 2}px`;
        target.style.fontSize = newFontSize;
      });
    }, 0);
  }, */
  data() {
    return {
      countDown: 3
    };
  },
  methods: {
    countTime() {
      if (this.countDown > -1) {
        setTimeout(() => {
          this.countDown--;
        }, 1000);
        const soundEnabled = this.options.settings.sound;
        if (soundEnabled) {
          let audio;
          if (this.countDown) {
            audio = new Audio(require("@/assets/sounds/beep_short.mp3"));
          } else {
            audio = new Audio(require("@/assets/sounds/beep_long.mp3"));
          }
          audio.play();
        }
        return this.countDown ? this.countDown : "GO";
      } else {
        this.$emit("changeState", {
          state: "anzan-game-time",
          options: this.options
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.anzan__count-down {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
  font-size: 35vh;
}
</style>
