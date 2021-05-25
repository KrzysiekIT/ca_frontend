<template>
  <nuxt-child></nuxt-child>
</template>
<script>
import socket from "~/mixins/sockets.js";
import user from "~/mixins/group.vue";
export default {
  mixins: [socket, user],
  created() {
    if (process.client) {
      this.sendResult("game", {
        studentId: this.user.id,
        game: "abacus",
        action: "lesson-choice"
      });
    }
  }
};
</script>
