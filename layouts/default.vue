<template>
  <div class="default--layout">
    <Nuxt />
  </div>
</template>
<script>
export default {
/*   mounted() {
    this.socket = this.$nuxtSocket({});
    this.socket.emit("message", { id: "abc123" }, res => {
      console.log("Wysyłałem event 'message' z obiektem, w odpowiedzi dostałem");
      console.log(res);
    });
    this.socket.on("message", (message, cb) => {
      console.log("Odebrano  event 'message'");
      console.log(message);
    });
  } */
};
</script>
<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 20px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.default--layout {
  background-color: $mainBackground;
  color: #fff;
  min-height: 100vh;
  padding: 1rem 1rem 0 1rem;
}
.embed-responsive-item {
  width: 16rem;
  height: 9rem;
}
</style>
