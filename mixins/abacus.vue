<script>
export default {
  computed: {
    lessonsTitles() {
      return this.$store.state.abacus.lessons;
    }
  },
  async created() {
    if (process.client) {
      if (!this.$store.state.abacus.downloaded) {
        let lessonsTitles = await this.$store.dispatch("auth/request", {
          method: "get",
          url: `abacus`
        });
        lessonsTitles = lessonsTitles.data;
        this.$store.commit("abacus/setNewLessons", lessonsTitles);
      }
    }
  }
};
</script>
