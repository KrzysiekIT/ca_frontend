<template>
  <section class="terms">
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
    </header>
    <fieldset class="terms__fields">
      <!-- {{ editablesUser }} -->
      <div class="terms__fields-box">
        <div class="terms__fields-single terms__fields-single--vertical">
          <span class="terms__label terms__label--data">{{
            $t("settings.child_data")
          }}</span>
          <div class="terms__inputs">
            <input
              class="terms__input terms__input--short input"
              :placeholder="$t('settings.name')"
              v-model="editablesUser.name"
            />
            <input
              class="terms__input terms__input--short input"
              :placeholder="$t('settings.surname')"
              v-model="editablesUser.surname"
            />
          </div>
          <input
            class="terms__input terms__input--short input"
            :placeholder="$t('settings.birth_year')"
            v-model="editablesUser.birth_year"
          />
        </div>
        <div class="terms__fields-single terms__fields-single--vertical">
          <span class="terms__label terms__label--data">{{
            $t("settings.legal_guardian_data")
          }}</span>
          <input
            class="terms__input terms__input--medium input"
            :placeholder="$t('settings.name_and_surname')"
            v-model="editablesUser.parent_full_name"
          />
        </div>
        <div class="terms__fields-single terms__fields-single--vertical">
          <span class="terms__label terms__label--data">{{
            $t("settings.address_of_residence")
          }}</span>
          <div class="terms__inputs">
            <input
              class="terms__input terms__input--medium input"
              :placeholder="$t('settings.street')"
            />
            <input
              class="terms__input terms__input--tiny input"
              :placeholder="$t('settings.postal_code')"
            />
            <input
              class="terms__input terms__input--tiny input"
              :placeholder="$t('settings.city')"
            />
          </div>
          <input
            class="terms__input terms__input--medium input"
            :placeholder="$t('settings.contact_number')"
          />
        </div>
      </div>
    </fieldset>
    <section class="terms__article-box u-margin-top-small">
      <article v-html="termsOfUse"></article>
    </section>
    <section class="terms__accept u-margin-top-small">
      <label class="terms__input-label checkbox">
        {{ $t("settings.accept") }}
        <input type="checkbox" v-model="accepted" />
        <span class="checkmark"></span>
      </label>
      <button
        class="button button--default"
        @click="acceptTerms"
        :disabled="!accepted"
      >
        {{ $t("settings.send") }}
      </button>
    </section>
  </section>
</template>

<script>
import user from "~/mixins/user.js";
import { setAuthToken } from "~/utils/auth";
export default {
  middleware: "auth",
  meta: {
    auth: { authority: 8 }
  },
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
      termsOfUse: "",
      editablesUser: JSON.parse(JSON.stringify({ ...this.user })),
      accepted: false
    };
  },
  mixins: [user],
  methods: {
    acceptTerms() {
      this.$store
        .dispatch("auth/request", {
          method: "patch",
          url: `students/${this.user.id}`,
          data: { newValues: { terms_accepted: this.accepted ? 1 : 0 } }
        })
        .then(() => {
          this.$store
            .dispatch("auth/request", {
              method: "post",
              url: "auth/refresh"
            })
            .then((response) => {
              this.$store.dispatch("auth/new_token", response.data);
              this.$router.push("/student");
            });
          /* this.$store.dispatch("auth/new_token", response.data).then(res => {
            this.$router.push("/student");
          }); */
          //this.router.push("/student");
          /* this.$store.dispatch("new_token", response.data);
          setAuthToken(response.data.token);
          cookies.set("x-access-token", response.data.token, { expires: 7 });
          this.router.push("/student"); */
        });
    }
  },
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

  &__fields {
    display: flex;
    justify-content: center;
    padding: 1rem;
    border: none;
  }

  &__fields-box {
    width: 30rem;
    display: flex;
    flex-direction: column;
  }

  &__fields-single {
    display: flex;

    &--vertical {
      flex-direction: column;
    }
  }

  &__label {
    padding-bottom: 0.25rem;
    &--data {
      text-decoration: underline;
    }
  }

  &__input {
    margin-bottom: 0.5rem;
    &--tiny {
      width: 5rem;
    }
    &--short {
      width: 10rem;
    }
    &--medium {
      width: 15rem;
    }
  }

  &__inputs {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.25rem;
  }

  &__input-label {
    display: flex;
    gap: 0.25rem;
    text-transform: uppercase;
    align-items: center;
  }

  &__accept {
    display: flex;
    justify-content: flex-end;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    gap: 1rem;
  }
}
</style>
