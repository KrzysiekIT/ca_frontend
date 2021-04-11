<template>
  <div class="default--layout">
    <Nuxt />
  </div>
</template>

<style lang="scss"->
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
</style>
