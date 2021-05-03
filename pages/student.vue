<template>
  <div>
    <header class="header">
      <div class="header--logo-box">
        <img
          src="~/assets/images/logo.png"
          alt="Champions academy"
          class="header--logo"
        />
      </div>
      <section class="header--middle">
        <div class="header--upper">
          <figure class="user--box">
            <img
              src="~/assets/images/user.png"
              alt="User icon"
              class="user--image"
            />
            <figcaption class="user--label">
              Uczeń <strong>Jan Kowalski</strong>
            </figcaption>
          </figure>
          <ul class="lang--list">
            <li class="lang--list-item">
              <a href="#" title="Zmień język">
                <img
                  src="~/assets/images/flag_usa.svg"
                  alt="USA flag"
                  class="lang--image"
                />
              </a>
            </li>
          </ul>
        </div>
        <ul class="user--list">
          <li class="user--list-item">
            <img
              src="~/assets/images/camera.png"
              alt="Camera icon"
              class="user--image__camera"
            /><label
              ><span class="user--link">Zajęcia</span
              ><a class="user--href" href="#" target="_blank"
                >link.do.zajec.pl</a
              ></label
            >
          </li>
          <li class="user--list-item">
            <img
              src="~/assets/images/camera.png"
              alt="Camera icon"
              class="user--image__camera"
            /><label
              ><span class="user--link">Odrabianie zajęc</span
              ><a class="user--href" href="#" target="_blank"
                >link.do.zajec.pl</a
              ></label
            >
          </li>
        </ul>
      </section>
      <section class="header--end">
        <img
          src="~/assets/images/money.svg"
          alt="Sad icon"
          class="header__image--end"
        />
        <img
          src="~/assets/images/sad.svg"
          alt="Sad icon"
          class="header__image--end"
        />
      </section>
    </header>
    <div class="page--middle">
      <NavigationStudent />
      <main class="main">
        <nuxt-child />
      </main>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  meta: {
    auth: { authority: 8 }
  },
  layout: "default",
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/reset").then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.header--logo-box {
  width: $logoIconWidth;
}
.header--logo {
  width: 10rem;
}
@media only screen and (max-width: 800px) {
  .header {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .header--logo-box {
    display: flex;
    justify-content: center;
  }
}
$headerEndWidth: 10rem;
.header--middle {
  display: flex;
  flex-direction: column;
  min-width: calc(100% - #{($headerEndWidth + $logoIconWidth)});
}
.header--end {
  display: flex;
  width: $headerEndWidth;
}
.header__image--end {
  height: 4rem;
}
.header--upper {
  display: flex;
  padding: 0 5rem 0 5rem;
}
@media only screen and (max-width: 800px) {
  .header--upper {
    justify-content: center;
  }
}
.user--box {
  align-items: center;
  display: flex;
}
.user--label {
  font-size: 1.5rem;
  padding-left: 1rem;
}
.user--image {
  height: 3rem;
}
.user--list {
  list-style: none;
  padding-top: 1rem;
}
@media only screen and (max-width: 800px) {
  .user--list {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .user--list-item {
    margin: 0;
    display: inline-block;
  }
}
.user--image__camera {
  height: 1rem;
  padding-right: 0.25rem;
}
.user--link {
  padding-right: 0.5rem;
}
.user--href {
  background-color: #fff;
  border-radius: $appRadius;
  color: $mainBackground;
  padding: 0 2rem 0 2rem;
  text-decoration: none;
}
.user--href:hover {
  background-color: #fffe;
}
.user--list-item {
  padding: 0.25rem;
}
.lang--list {
  display: flex;
  list-style: none;
  padding-left: 5rem;
}
@media only screen and (max-width: 800px) {
  .lang--list {
    padding-left: 1rem;
  }
}
.lang--list-item {
  align-self: center;
}
.lang--image {
  height: 1.5rem;
}
.spacer {
  width: 12rem;
}
.page--middle {
  display: flex;
}
.main {
  /* background-color: #fff; */
  border-radius: 4rem;
  border: 0.125rem solid #fff;
  min-width: calc(100% - #{$navMenuWidth});
  padding: 2rem;
}

@media only screen and (max-width: 800px) {
  .main {
    min-width: 100%;
  }
}
</style>
