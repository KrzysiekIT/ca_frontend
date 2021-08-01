<template>
  <div class="activate">
    <p class="active__message" :class="activateClass">{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: this.$t("general.loading"),
      activateClass: ""
    };
  },
  async created() {
    if (process.client) {
      const code = this.$route.query.code;
      if (!code) {
        this.message = this.$t("general.oops");
        this.activateClass = "activate__message--wrong";
        return;
      }
      const response = await this.$store.dispatch("auth/request", {
        method: "post",
        url: `activation-links/activate/${this.$route.query.code}`
      });
      if (response.data && response.data.activated === "no-activated") {
        this.message = this.$t("general.oops");
        this.activateClass = "activate__message--wrong";
      } else {
        this.message = this.$t("general.activate_message");
        this.activateClass = "activate__message--success";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.activate {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;

  &__message {
    &--wrong {
      color: $red;
    }
    &--success {
      color: $resultCorrect;
    }
  }
}
</style>
