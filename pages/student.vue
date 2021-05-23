<template>
  <div>
    <client-only>
      <slide-menu
        @openMenu="handleOpenMenu"
        :closeOnNavigation="true"
        ref="slide-menu"
        v-if="$route.name !== 'student-terms-first'"
      >
        <div class="header--logo-box">
          <img
            src="~/assets/images/logo.png"
            alt="Champions academy"
            class="header--logo"
          />
        </div>
        <NavigationStudent />
      </slide-menu>
    </client-only>
    <header class="header" v-if="$route.name !== 'student-terms-first'">
      <section class="header--middle">
        <div class="header--upper">
          <figure class="user--box">
            <img
              src="~/assets/images/user.png"
              alt="User icon"
              class="user--image"
            />
            <figcaption class="user--label">
              {{ $t("general.student") }}
              <strong>{{ `${user.name} ${user.surname}` }}</strong>
            </figcaption>
          </figure>
          <ul class="lang--list">
            <li class="lang--list-item">
              <button
                class="lang__button"
                @click="$i18n.setLocale(locale.code)"
                v-for="locale in availableLocales"
                :key="locale.code"
                :title="$t('general.change_language')"
              >
                <img
                  src="~/assets/images/flag_usa.svg"
                  alt="USA flag"
                  class="lang--image"
                  v-if="locale.code === 'pl'"
                />
                <img
                  src="~/assets/images/flag_poland.svg"
                  alt="Poland flag"
                  class="lang--image"
                  v-if="locale.code === 'en'"
                />
              </button>
            </li>
          </ul>
        </div>
        <ul class="user--list">
          <li class="user--list-item">
            <lesson-link label="Zajęcia" link="link.do.zajec.pl"></lesson-link>
          </li>
          <li class="user--list-item">
            <lesson-link
              label="Odrabianie zajęć"
              link="link.do.zajec.pl"
            ></lesson-link>
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
    },
    availableLocales() {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale);
    }
  },
  methods: {
    handleOpenMenu() {
      setTimeout(() => {
        this.$refs["slide-menu"].$el.firstChild.firstChild.style.width =
          "30rem";
      }, 0);
    },
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
$headerEndWidth: 10rem;
.header--middle {
  display: flex;
  flex-direction: column;
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
.lang__button {
  background-color: transparent;
  border-radius: 50%;
  padding: 0;
  border: none;
  transition: all 0.5s;
}
.lang__button:hover {
  cursor: pointer;
  box-shadow: 0 1rem 2rem rgba($white, 0.5);
  transform: translateY(-4px);
}
.lang__button:active {
  cursor: pointer;
  box-shadow: 0 2rem 4rem rgba($white, 0.5);
  transform: translateY(-2px);
}
.spacer {
  width: 12rem;
}
.page--middle {
  display: flex;
}
.main {
  /* background-color: #fff; */
  /* border-radius: 4rem;
  border: 0.125rem solid #fff; */
  min-width: 100%;
  padding: 2rem;
}

@media only screen and (max-width: 800px) {
  .main {
    min-width: 100%;
  }
}
</style>
