<template>
  <div class="abacus">
    <header class="abacus__header">
      <div class="abacus__header--main">
        <span class="abacus__label">{{ $t("general.lesson") }}</span>
        <score-box
          :presences="{ present: $route.params['level'], total: 48 }"
        />
        <mark class="abacus__note">{{ note }}</mark>
      </div>
      <div class="abacus__header--sub">
        <p class="abacus__title">{{ getTitle() }}</p>
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
import soroban from "~/mixins/soroban.js";
import soroban_settings from "~/mixins/soroban_settings.js";
import abacus from "~/mixins/abacus.vue";
export default {
  mixins: [socket, soroban, abacus],
  components: {
    AbacusBox: () => import("@/components/abacus/Box.vue")
  },
  mounted() {
    this.allSamples = this.generateSample({
      ...soroban_settings[this.$route.params["level"]],
      samples: 30
    });
    if (process.client) {
      this.sendResult("game", {
        studentId: this.$route.query.user_id,
        game: "abacus",
        action: "start",
        samples: this.allSamples,
        demoId: this.$route.query.demo_id
      });
    }
  },
  data() {
    return {
      allSamples: [],
      results: [],
      note: this.$t("general.note")
    };
  },
  methods: {
    getTitle() {
      return this.lessonsTitles?.[this.$route.params["level"]]?.[
        `title_${this.$i18n.locale}`
      ];
    }
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
  text-transform: lowercase;
}
.abacus__title::first-letter {
  text-transform: uppercase;
}
</style>
