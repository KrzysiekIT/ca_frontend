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
              <strong>Admin</strong>
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
          <div class="spacer"></div>
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
    </header>
    <div class="page--middle">
      <NavigationAdmin />
      <main class="main">
        <!-- <section class="main__flip"> --><nuxt-child /><!-- </section> -->
      </main>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  meta: {
    auth: { authority: 7 }
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
}
.header--logo-box {
  width: $logoIconWidth;
}
.header--logo {
  height: 8rem;
}
$headerEndWidth: 10rem;
.header--middle {
  display: flex;
  flex-direction: column;
  min-width: calc(100% - #{calc($headerEndWidth + $logoIconWidth)});
}
.header--end {
  display: flex;
  width: $headerEndWidth;
}
.header--upper {
  display: flex;
  padding: 0 5rem 0 5rem;
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
.user--list li {
  display: flex;
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
  min-width: calc(100% - #{$navMenuWidth});
  overflow: auto;
  padding: 0.5rem;
  /* transform: rotateX(180deg);
  scrollbar-width: auto;
  scrollbar-color: $yellow $darkYellow; */
}
/* .main::-webkit-scrollbar-track {
  background: $darkYellow;
}
.main::-webkit-scrollbar {
  width: 10px;
}
.main::-webkit-scrollbar-thumb {
  background: $yellow;
}
.main::-webkit-scrollbar-thumb:hover {
  background: $lightYellow;
}
.main__flip {
  height: 100%;
  transform: rotateX(180deg);
  width: 100%;
} */

</style>
