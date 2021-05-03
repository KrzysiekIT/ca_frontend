export default {
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  }
};
