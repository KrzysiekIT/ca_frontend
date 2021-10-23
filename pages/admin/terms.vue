<template>
  <div>
    <template v-if="user.role.name === 'superadmin'">
      <client-only>
        <VueEditor v-model="termsOfUse" />
      </client-only>
      <button class="save button button--default" @click="saveChanges">
        {{ $t("general.save") }}
      </button>
      <span class="saved" v-if="saved">{{ $t("general.saved") }} ✔</span>
    </template>
    <template v-else>
      {{ $t("general.no_acces_message") }}
    </template>
  </div>
</template>

<script>
import user from "~/mixins/user.js";

export default {
  mixins: [user],
  async fetch() {
    const termsOfUse = (
      await this.$store.dispatch("auth/request", {
        method: "get",
        url: "terms"
      })
    )?.data?.[0]?.body;
    this.termsOfUse = termsOfUse;
  },
  data() {
    return {
      termsOfUse: "",
      saved: false
    };
  },
  methods: {
    saveChanges() {
      this.$store
        .dispatch("auth/request", {
          method: "put",
          url: `terms`,
          data: {
            newValues: {
              body: this.termsOfUse
            }
          }
        })
        .then(res => {
          this.saved = true;
          setTimeout(() => {
            this.saved = false;
          }, 1000);
        });
    },
    escapeHtml(unsafe) {
      return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
  }
};
</script>

<style lang="scss" scoped>
.save {
  margin-top: 4rem;
  display: inline-block;
}
.saved {
  color: $green;
  margin-left: 1rem;
}
</style>
