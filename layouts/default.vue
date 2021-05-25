<template>
  <div class="default--layout">
    <Nuxt />
  </div>
</template>
<script>
import abacus from "~/mixins/abacus.vue";
export default {
  mixins: [abacus]
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

@media only screen and (max-width: 550px) {
  html {
    font-size: 6px;
  }
}

@media only screen and (min-width: 550px) and (max-width: 700px) {
  html {
    font-size: 8px;
  }
}

@media only screen and (min-width: 700px) and (max-width: 800px) {
  html {
    font-size: 10px;
  }
}

@media only screen and (min-width: 800px) and (max-width: 1000px) {
  html {
    font-size: 12px;
  }
}

@media only screen and (min-width: 1000px) and (max-width: 1200px) {
  html {
    font-size: 14px;
  }
}

@media only screen and (min-width: 1200px) and (max-width: 1400px) {
  html {
    font-size: 16px;
  }
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

.bm-menu {
  padding-top: 0 !important;
  background-color: darken($mainBackground, 5);
}

.bm-burger-button {
  height: 1.5rem;
  width: 1.8rem;
  left: 1.8rem;
  top: 1.8rem;
}

.u-margin-small {
  margin: 1rem 0.25rem;
}
</style>
