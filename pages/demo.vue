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
        <NavigationDemo />
      </slide-menu>
    </client-only>
    <div class="page--middle">
      <main class="main">
        <nuxt-child />
      </main>
    </div>
  </div>
</template>
<script>
export default {
  async mounted() {
    if (process.client) {
      const isDemoExists = await this.$store.dispatch("auth/request", {
        method: "get",
        url: `demo/check/${this.$route.query.demo_id}`
      });
      if (!isDemoExists.data) {
        this.$router.push("/login");
        return;
      }
      if (isDemoExists.data.length === 0) {
        this.$router.push("/login");
        return;
      }
      const demoLesson = isDemoExists.data[0];
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      const yyyy = today.getFullYear();

      const todayDate = yyyy + "-" + mm + "-" + dd;

      const isTheSameDay = todayDate === demoLesson.day.substring(0, 10);
      if (!isTheSameDay) {
        this.$router.push("/login");
        return;
      }
    }
    if (process.client) {
      if (!this.$route.query.user_id) {
        this.$router.push({
          query: { ...this.$route.query, user_id: this.getRandomString(10) }
        });
      }
    }
  },
  methods: {
    handleOpenMenu() {
      setTimeout(() => {
        this.$refs["slide-menu"].$el.firstChild.firstChild.style.width =
          "30rem";
      }, 0);
    },
    getRandomString(length) {
      const randomChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length)
        );
      }
      return result;
    }
  }
};
</script>
<style lang="scss" scoped>
.header--logo-box {
  width: $logoIconWidth;
}
.header--logo {
  height: 8rem;
}
.page--middle {
  display: flex;
  padding-top: 6rem;
}
.main {
  min-width: 100%;
  padding: 2rem;
}
</style>
