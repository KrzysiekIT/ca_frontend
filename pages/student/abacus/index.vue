<template>
  <lesson-box page="abacus" :borderNumber="borderNumber" />
</template>
<script>
import user from "~/mixins/user.js";
import group from "~/mixins/group.vue";
import socket from "~/mixins/sockets.js";
export default {
  mounted() {
    if (process.client) {
      this.socket.on("game", (message, cb) => {
        if (message.studentId === this.user.id && message.action === "unlock") {
          this.$store
            .dispatch("auth/request", {
              method: "post",
              url: "auth/refresh"
            })
            .then(response => {
              this.$store.dispatch("auth/new_token", response.data).then(() => {
                this.sendResult("game", {
                  studentId: userId,
                  game: "abacus",
                  action: "settings",
                  borderNumber: this.borderNumber,
                  demoId: this.$route.query.demo_id
                });
              });
            });
        }
      });

      let userId;
      if (this.$route.name.startsWith("demo")) {
        userId = this.$route.query.user_id;
      } else {
        userId = this.user.id;
      }
      this.sendResult("game", {
        studentId: userId,
        game: "abacus",
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
      const userLevel = this.user[`abacus_level`] ?? 1;
      return userLevel + 1;
    }
  }
};
</script>
