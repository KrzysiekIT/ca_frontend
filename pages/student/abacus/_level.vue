<template>
  <div class="abacus">
    <header class="abacus__header">
      <div class="abacus__header--main">
        <span class="abacus__label">LEKCJA</span>
        <score-box
          :presences="{ present: $route.params['level'], total: 48 }"
        />
        <mark class="abacus__note">NOTATKA</mark>
      </div>
      <div class="abacus__header--sub">
        <span class="abacus__title">TYTUŁ LEKCJI</span>
      </div>
    </header>
    <abacus-box
      :exercises="allSamples"
      :results="results"
      :mode="'student'"
    ></abacus-box>
  </div>
</template>
<script>
import socket from "~/mixins/sockets.js";
import user from "~/mixins/user.js";
import soroban from "~/mixins/soroban.js";
import soroban_settings from "~/mixins/soroban_settings.js";
export default {
  mixins: [socket, user, soroban],
  components: {
    AbacusBox: () => import("@/components/abacus/Box.vue")
  },
  middleware({ store, route, redirect }) {
    const gameLevel = store.state.group.current[`abacus_level`] ?? 1;
    const userLevel = store.state.auth.user[`abacus_level`] ?? 1;
    const currentLevel = route.params["level"];
    const maxLevel = Math.max(gameLevel, userLevel);
    if (+currentLevel > maxLevel) {
      return redirect("/student/abacus");
    }
  },
  mounted() {
    this.allSamples = this.generateSample({
      ...soroban_settings[this.$route.params["level"]],
      samples: 30
    });
    if (process.client) {
      this.sendResult("game", {
        studentId: this.user.id,
        game: "abacus",
        action: "start",
        samples: this.allSamples
      });
    }
  },
  data() {
    return {
      allSamples: [],
      results: []
    };
  }
};
</script>
<style lang="scss" scope>
.abacus__header--main {
  align-items: center;
  display: flex;
  font-size: 1.5rem;
  flex-wrap: wrap;
}
.abacus__label {
  margin-right: 1rem;
}
.abacus__note {
  background-color: $yellow;
  border-radius: $appRadius;
  color: $black;
  padding: 0.25rem 1rem;
  margin-left: 1rem;
}
.abacus__header--sub {
  margin: 2rem 0;
}
.abacus__title {
  font-size: 1.25rem;
}
</style>
