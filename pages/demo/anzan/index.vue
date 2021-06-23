<template>
  <lesson-box page="anzan" :borderNumber="borderNumber" />
</template>
<script>
import user from "~/mixins/user.js";
import group from "~/mixins/group.vue";
import socket from "~/mixins/sockets.js";
export default {
  mounted() {
    if (process.client) {
      let userId;
      if (this.$route.name.startsWith("demo")) {
        userId = this.$route.query.user_id;
      } else {
        userId = this.user.id;
      }
      this.sendResult("game", {
        studentId: userId,
        game: "anzan",
        action: "settings",
        borderNumber: this.borderNumber,
        demoId: this.$route.query.demo_id
      });
    }
  },
  mixins: [user, group, socket],
  computed: {
    borderNumber() {
      if (this.$route.name.startsWith("demo")) {
        return 2;
      }
      const userLevel = this.user[`anzan_level`] ?? 1;
      return userLevel + 1;
    }
  }
};
</script>
