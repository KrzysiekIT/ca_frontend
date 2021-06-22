<script>
import user from "~/mixins/user.js";
export default {
  mixins: [user],
  computed: {
    group() {
      return this.$store.state.group.current;
    }
  },
  async created() {
    if (process.client) {
      if (this.$route.name.startsWith("demo")) {
        return {};
      }
      if (!this.$store.state.group.downloaded) {
        let group = await this.$store.dispatch("auth/request", {
          method: "get",
          url: `groups/${this.user.group_id}`
        });
        group = group.data[0];
        this.$store.commit("group/setNewGroup", group);
      }
    }
  }
};
</script>
