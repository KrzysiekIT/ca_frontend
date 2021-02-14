<template>
  <div class="login--layout">
    <header class="login--header">
      <figure>
        <Logo />
        <figcaption class="logo--label">Champions<br />academy</figcaption>
      </figure>
    </header>
    <main class="login--box">
      <Nuxt />
    </main>
  </div>
</template>

<style>
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
.login--layout {
  background-color: #003366;
  color: #fff;
  min-height: 100vh;
  padding-top: 3rem;
}
.login--header {
  display: flex;
  justify-content: center;
}
.login--box {
  display: flex;
  justify-content: center;
  padding-top: 2rem;
}
.logo--label {
  display: flex;
  font-size: 1.5rem;
  justify-content: flex-end;
  text-transform: uppercase;
}
</style>
