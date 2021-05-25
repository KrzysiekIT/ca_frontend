<template>
  <div>
    {{ state }}
    <component
      :is="state.current"
      :options="state.options"
      @changeState="changeState"
      @generate="generate"
    />
  </div>
</template>
<script>
import socket from "~/mixins/sockets.js";
import user from "~/mixins/user.js";
import soroban from "~/mixins/soroban.js";
import soroban_settings from "~/mixins/soroban_settings.js";
export default {
  mixins: [socket, user, soroban, soroban_settings],
  created() {
    if (process.client) {
      this.sendResult("game", {
        studentId: this.user.id,
        game: "anzan",
        action: "lesson-choice"
      });
    }
  },
  components: {
    AnzanCountDown: () => import("@/components/anzan/CountDown.vue"),
    AnzanGameTime: () => import("@/components/anzan/GameTime.vue"),
    AnzanPutResult: () => import("@/components/anzan/PutResult.vue"),
    AnzanResult: () => import("@/components/anzan/Result.vue"),
    AnzanSettings: () => import("@/components/anzan/Settings.vue")
  },
  data() {
    return {
      replay: false,
      state: {
        current: "anzan-settings",
        options: {
          settings: {},
          generatedNumbers: []
        }
      }
    };
  },
  methods: {
    changeState({ state, options = {}, replay }) {
      const newState = { current: state, options };
      this.state = newState;
      if (replay === true) {
        this.replay = true;
      } else {
        this.replay = false;
      }
    },
    generate() {
      if (!this.replay) {
        const settings = this.state.options.settings;
        const samples = this.generateSample({
          ...soroban_settings[this.$route.params["level"]],
          samples: 1,
          minSamples: settings.operationNumber,
          maxSamples: settings.operationNumber,
          minDigits: settings.complexity.toString().length,
          maxDigits: settings.complexity.toString().length,
          smallNumber: settings.range === "1-4" ? 31 : 1,
          bigNumber: settings.range === "1-9" ? 1023 : 1,
          isRequired: 0
        })[0];
        this.state.options.generatedNumbers = samples.filter(
          sample => sample !== 0
        );
      }
      this.sendResult("game", {
        studentId: this.user.id,
        game: "anzan",
        action: "start",
        samples: this.state.options.generatedNumbers
      });
    }
  }
};
</script>
