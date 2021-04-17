<template>
  <div class="anzan__count-down" ref="anzan-count-down">
    {{ countTime() }}
  </div>
</template>
<script>
export default {  beforeMount() {
    setTimeout(() => {
      this.$nextTick(() => {
        const target = this.$refs["anzan-count-down"];
        const mainHeight = target.parentElement.parentElement.offsetHeight;
        const newFontSize = `${mainHeight / 2}px`;
        target.style.fontSize = newFontSize;
      });
    }, 0);
  },
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
        return this.countDown ? this.countDown : "GO";
      } else {
        this.$emit("changeState", "anzan-count-down");
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
}
</style>
