<template>
  <div class="terms">
    <header class="terms__header">
      <div class="terms__title terms__title--main">
        <img
          src="~/assets/images/terms_of_use.svg"
          alt="Document Icon"
          height="96"
        /><span class="terms__title">{{ $t("general.terms_of_use") }}</span>
      </div>
      <p class="terms__title terms__title--sub">
        {{ $t("general.input_student_data_info") }}
      </p>
      <div class="terms__article-box u-margin-top-small">
        <article v-html="termsOfUse"></article>
      </div>
    </header>
    <div style="padding-top: 400px;">
      ZAAKCEPTUJ TERMSY!!! {{ user }}
      <div>
        <input placeholder="ELO" class="input" />
      </div>
    </div>
  </div>
</template>

<script>
import user from "~/mixins/user.js";
export default {
  middleware: "auth",
  meta: {
    auth: { authority: 8 }
  },
  async fetch() {
    const termsOfUse = (
      await this.$store.dispatch("auth/request", {
        method: "get",
        url: `terms`
      })
    )?.data?.[0]?.body;
    this.termsOfUse = termsOfUse.substring(1, termsOfUse.length-1);;
  },
  data() {
    return {
      termsOfUse: ""
    };
  },
  mixins: [user],
  layout: "default"
};
</script>
<style lang="scss" scoped>
.terms {
  &__title {
    font-weight: 100;
    text-transform: uppercase;
    text-align: center;

    &--main {
      font-size: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &--sub {
      margin-top: 1rem;
      font-size: 1.5rem;
    }
  }

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
