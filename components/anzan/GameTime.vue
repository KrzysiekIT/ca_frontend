<template>
  <div class="anzan__game" ref="anzan-game">
    {{ nextNumber(game) }}
  </div>
</template>
<script>
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
  data() {
    return {
      game: {
        generatedNumbers: [1, 2, 3, 4, -43, 2, 9, 1],
        currentIndex: 0,
        speed: 1000
      }
    };
  },
  methods: {
    nextNumber(game) {
      const { generatedNumbers, speed } = game;
      if (generatedNumbers[game.currentIndex]) {
        setTimeout(() => {
          ++game.currentIndex;
        }, speed);
        const numberToShow = generatedNumbers[game.currentIndex];
        return `${numberToShow < 0 ? "" : "+"}${numberToShow}`;
      } else {
        this.$emit("changeState", "anzan-game-time");
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
