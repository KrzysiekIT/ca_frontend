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
export default {
  mixins: [socket, user],
  components: {
    AbacusBox: () => import("@/components/abacus/Box.vue")
  },
  created() {
    if (process.client) {
      this.sendResult("game", {
        studentId: this.user.id,
        game: "anzan",
        message: "anzan-start",
        samples: this.allSamples
      });
    }
  },
  data() {
    return {
      allSamples: [
        [-3, 1, 4, 5],
        [3, 1, 4, 5],
        [8, 1, 4, 5],
        [-3, 1, 6, 5],
        [-3, 3, 4, 5],
        [-3, 1, 7, 5],
        [3, 2, 4, 5],
        [-3, 1, -9, 5],
        [-3, 1, 4, 4],
        [3, 1, 4, 5],
        [-3, 2, 4, 5],
        [-3, 1, 4, 5],
        [3, 1, 7, 8]
      ],
      results: []
    };
  },
  methods: {
    generateSamples() {
      const samplesNumber = 50;
      const sampleLenght = { min: 4, max: 6 };
      const interval = { min: 100, max: 999 };
    },
  }
};
</script>
<style lang="scss" scope>
.abacus__header--main {
  align-items: center;
  display: flex;
  font-size: 1.5rem;
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
