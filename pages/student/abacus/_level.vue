<template>
  <div class="abacus">
    <header class="abacus__header">
      <div class="abacus__header--main">
        <span class="abacus__label">{{ $t("general.lesson") }}</span>
        <score-box
          :presences="{ present: $route.params['level'], total: 48 }"
        />
        <input
          readonly
          class="abacus__note"
          :value="note"
          :placeholder="$t('general.note') + '…'"
        />
      </div>
      <div class="abacus__header--sub">
        <span class="abacus__title">{{ getTitle() }}</span>
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
import abacus from "~/mixins/abacus.vue";
export default {
  mixins: [socket, user, soroban, abacus],
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
      this.socket.on("game", (message, cb) => {
        if (message.studentId === this.user.id && message.action === "note") {
          this.note = message.note;
        }
      });
      console.log("SENDING");
      this.sendResult("game", {
        studentId: this.user.id,
        game: "abacus",
        action: "start",
        samples: this.allSamples,
        level: this.$route.params["level"]
      });
    }
  },
  async created() {
    const noteRes = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `notes/${this.user.id}/abacus/${this.$route.params["level"]}`
    });
    this.note = noteRes.data?.[0]?.note;
  },
  data() {
    return {
      allSamples: [],
      results: [],
      note: ""
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
  font-size: 1.25rem;
  cursor: default;
  width: 75%;
}
.abacus__header--sub {
  margin: 2rem 0;
}
.abacus__title {
  font-size: 1.25rem;
  text-transform: capitalize;
}
</style>
