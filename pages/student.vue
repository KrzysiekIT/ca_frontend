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
      <img
        src="~/assets/images/logo.png"
        alt="Champions academy"
        class="logo"
      />
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
              <fa
                class="logout"
                icon="sign-out-alt"
                title="Wyloguj"
                @click="logOut"
              />
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
                  v-if="locale.code === 'en'"
                />
                <img
                  src="~/assets/images/flag_poland.svg"
                  alt="Poland flag"
                  class="lang--image"
                  v-if="locale.code === 'pl'"
                />
              </button>
            </li>
          </ul>
        </div>
        <ul class="user--list">
          <li class="user--list-item">
            <lesson-link
              :label="$t('general.lessons')"
              :link="group.lesson_link"
            ></lesson-link>
          </li>
          <li class="user--list-item">
            <lesson-link
              :label="$t('general.lessons_reschedule')"
              link="link.do.zajec.pl"
            ></lesson-link>
          </li>
        </ul>
      </section>
      <section class="header--end">
        <nuxt-link
          to="#"
          class="link"
          :title="$t('general.show_payments_data')"
        >
          <img
            src="~/assets/images/money.svg"
            alt="Money icon"
            class="header__image--end"
          />
        </nuxt-link>
        <img
          src="~/assets/images/sad.svg"
          alt="Sad icon"
          class="header__image--end face"
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
import group from "~/mixins/group.vue";
export default {
  middleware: "auth",
  meta: {
    auth: { authority: 8 }
  },
  mixins: [group],
  layout: "default",
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    },
    availableLocales() {
      return this.$i18n
        .locales /* .filter(i => i.code !== this.$i18n.locale) */;
    }
  },
  methods: {
    handleOpenMenu() {
      setTimeout(() => {
        this.$refs["slide-menu"].$el.firstChild.firstChild.style.width =
          "27rem";
      }, 0);
    },
    logOut() {
      this.$store.dispatch("auth/reset").then(() => {
        this.$store.commit("group/reset");
        this.$store.commit("movies/reset");
        this.$router.push("/");
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
  position: sticky;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
  border-bottom: 2px solid darken($mainBackground, 5);
  background-color: $mainBackground;
  z-index: 10;
  top: 0;
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
  display: flex;
  gap: 0.25rem;
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
  box-shadow: 0 0.5rem 1rem rgba(transparent, 1);
  transform: translateY(-4px);
}
.lang__button:active {
  cursor: pointer;
  box-shadow: 0 1rem 2rem rgba(transparent, 1);
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
.logout {
  transform: translateX(2rem);
  cursor: pointer;
}
.logo {
  height: 4rem;
  padding-left: 2rem;
}
.face {
  margin-left: 0.25rem;
  transform: scale(0.63);
}
</style>
