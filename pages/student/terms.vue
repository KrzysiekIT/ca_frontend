<template>
  <section class="terms__article-box u-margin-top-small">
    <article v-html="termsOfUse"></article>
  </section>
</template>
<script>
export default {
  async fetch() {
    const termsOfUse = (
      await this.$store.dispatch("auth/request", {
        method: "get",
        url: "terms"
      })
    )?.data?.[0]?.body;
    this.termsOfUse = termsOfUse.substring(1, termsOfUse.length - 1);
  },
  data() {
    return {
      termsOfUse: ""
    };
  }
};
</script>
<style lang="scss" scoped>
.terms {
  &__article-box {
    width: 80%;
    border: 0.5rem solid $optionsBackground;
    background-color: $white;
    color: $black;
    min-height: 20vh;
    padding: 0.5rem;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
