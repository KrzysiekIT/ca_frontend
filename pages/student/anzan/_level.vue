<template>
  <div>{{state}}
    <component
      :is="state.current"
      :options="state.options"
      @changeState="changeState"
    />
  </div>
</template>
<script>
import socket from "~/mixins/sockets.js";
import user from "~/mixins/user.js";
export default {
  mixins: [socket, user],
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
      state: {
        current: "anzan-settings",
        options: null
      },
    };
  },
  methods: {
    changeState({ state, options = null }) {
      const newState = { current: state, options };
      this.state = newState;
    }
  }
};
</script>
