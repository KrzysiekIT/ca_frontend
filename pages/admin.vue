<template>
  <div>
    <client-only>
      <slide-menu
        @openMenu="handleOpenMenu"
        :closeOnNavigation="true"
        ref="slide-menu"
      >
        <div class="header--logo-box">
          <img
            src="~/assets/images/logo.png"
            alt="Champions academy"
            class="header--logo"
          />
        </div>
        <NavigationAdmin /> </slide-menu
    ></client-only>
    <header class="header">
        <img
          src="~/assets/images/logo.png"
          alt="Champions academy"
          class="logo"
        />
      <section class="header--middle">
        <div class="header--upper">
          <figure class="user--box">
            <img
              src="~/assets/images/trainers.svg"
              alt="User icon"
              class="user--image"
            />
            <figcaption class="user--label">
              <strong>{{ getHeaderTitle(user) }}</strong>
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
          <div class="spacer"></div>
        </div>
        <!-- <ul class="user--list">
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
        </ul> -->
      </section>
    </header>
    <header class="page--middle-header">
      {{ getRouteName(currentRouteName) }}
    </header>
    <div class="page--middle">
      <main class="main">
        <!-- <section class="main__flip"> --><nuxt-child /><!-- </section> -->
      </main>
    </div>
  </div>
</template>
<script>
import group from "~/mixins/group.vue";
export default {
  middleware: "auth",
  meta: {
    auth: { authority: 7 }
  },
  mixins: [group],
  layout: "default",
  data() {
    return {
      roles: [
        { value: 1, label: "Superadmin" },
        { value: 2, label: "Admin" },
        { value: 3, label: "Trener" }
      ]
    };
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    },
    availableLocales() {
      return this.$i18n
        .locales /* .filter(i => i.code !== this.$i18n.locale) */;
    },
    currentRouteName() {
      const splittedRouteName = this.$route.name.split("-");
      splittedRouteName.shift();
      return splittedRouteName.join("_");
    }
  },
  methods: {
    getHeaderTitle(user) {
      const roles = this.roles;
      let currentRole = roles.find(role => role.value === user.role.bit);
      if (currentRole) {
        currentRole = `${currentRole.label} `;
      }
      return `${currentRole}${user.name} ${user.surname}`;
    },
    getRouteName(currentRouteName) {
      if (currentRouteName === "presences_id") {
        return this.$t(`general.presences`);
      }
      if (currentRouteName === "payments_id") {
        return this.$t(`general.payments`);
      }
      if (currentRouteName.startsWith("teaching_materials")) {
        return this.$t(`general.teaching_materials`);
      }
      if (currentRouteName === "terms") {
        return this.$t(`general.terms_of_use`);
      }
      return currentRouteName && this.$t(`general.${currentRouteName}`);
    },
    logOut() {
      this.$store.dispatch("auth/reset").then(() => {
        this.$store.commit("group/reset");
        this.$store.commit("movies/reset");
        this.$router.push("/");
      });
    },
    handleOpenMenu() {
      setTimeout(() => {
        this.$refs["slide-menu"].$el.firstChild.firstChild.style.width =
          "24rem";
      }, 0);
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  position: sticky;
  align-content: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  padding-left: 3rem;
  border-bottom: 2px solid darken($mainBackground, 5);;
  background-color: $mainBackground;
  z-index: 10;
  top: 0;
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
  min-width: calc(100% - #{($headerEndWidth + $logoIconWidth)});
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
.user--list-item {
  padding: 0.25rem;
}
.lang--list {
  display: flex;
  list-style: none;
  padding-left: 5rem;
  gap: 1rem;
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
  flex-direction: column;
}
.main {
  /* background-color: #fff; */
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
.page--middle-header {
  font-size: 2rem;
  padding-left: 2rem;
  padding-top: 1rem;
  display: flex;
}
.logo {
  height: 4rem;
  padding-left: 2rem;
}
/* .main {
  min-width: calc(100% - #{$navMenuWidth});
  overflow: auto;
  padding: 0.5rem;
  transform: rotateX(180deg);
  scrollbar-width: auto;
  scrollbar-color: $yellow $darkYellow;
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
