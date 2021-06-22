<template>
  <nuxt-child></nuxt-child>
</template>
<script>
import socket from "~/mixins/sockets.js";
export default {
  mixins: [socket],
  created() {
    if (process.client) {
      this.sendResult("game", {
        studentId: this.$route.params.user_id,
        game: "anzan",
        action: "lesson-choice"
      });
    }
  }
};
</script>
