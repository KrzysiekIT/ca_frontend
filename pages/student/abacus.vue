<template>
  <nuxt-child :group="group"></nuxt-child>
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
        game: "abacus",
        action: "lesson-choice"
      });
    }
  },
  async fetch() {
    const group = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `groups/${this.user.group_id}`
    });
    this.group = group.data[0];
    console.log(this.group);
  },
  data() {
    return {
      group: {}
    };
  }
};
</script>
