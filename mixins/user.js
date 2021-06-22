export default {
  computed: {
    user() {
      if (this.$route.name.startsWith("demo")) {
        if (!this.$route.params.user_id) {
          return { id: this.$route.params.user_id };
        }
      }
      return (this.$store.state.auth || {}).user || null;
    }
  }
};
