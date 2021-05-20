<template>
  <div class="login--layout">
    <header class="login--header">
      <figure>
        <img
          src="~/assets/images/logo.png"
          alt="Champions academy"
          class="login--logo"
        />
      </figure>
    </header>
    <main class="login--box">
      <Nuxt />
    </main>
  </div>
</template>

<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
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
.login--layout {
  background-color: $mainBackground;
  color: #fff;
  min-height: 100vh;
  padding-top: 4.5rem;
}
.login--header {
  display: flex;
  justify-content: center;
}
.login--logo {
  width: 15rem;
}
.login--box {
  display: flex;
  justify-content: center;
  padding-top: 2.5rem;
}
.logo--label {
  display: flex;
  font-size: 2.25rem;
  justify-content: flex-end;
  text-transform: uppercase;
}
.u-margin-small {
  margin: 1rem 0.25rem;
}
</style>
