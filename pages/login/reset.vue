<template>
  <form @submit.prevent="submit" class="login--form">
    <h2 class="u-margin-small">Reset hasła</h2>
    <label class="login--label">
      <span class="login--label__input">Adres email</span>
      <input label="Email" v-model="email" class="login--input" />
    </label>
    <p class="reset__message" v-if="alert">{{ alert.message }}</p>
    <button type="submit" class="login--button">
      Wyślij link resetujący
    </button>
  </form>
</template>
<script>
export default {
  layout: "login",
  data() {
    return {
      email: "",
      password: "",
      alert: null,
      loading: false
    };
  },
  methods: {
    submit() {
      this.alert = null;
      this.loading = true;
      this.$store
        .dispatch("auth/request", {
          method: "post",
          url: "email/reset",
          data: { email: this.email }
        })
        .then(result => {
          //this.alert = { type: "success", message: result.data.message };
          this.alert = {
            type: "success",
            message: `Wysłano email na ${this.email}`
          };
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          if (error.response && error.response.data) {
            this.alert = {
              type: "error",
              message: error.response.data.message || error.reponse.status
            };
          }
        });
    }
  }
};
</script>
<style lang="scss" scope>
.login--form {
  padding-bottom: 2rem;
}
.login--label {
  font-size: 1.5rem;
  padding-bottom: 0.75rem;
}
.login--input {
  border: none;
  border-radius: $appRadius;
  font-size: 1.5rem;
  padding: 0.75rem;
}
.login--label__input {
  padding-bottom: 0.375rem;
}
.login--button {
  border: none;
  border-radius: $appRadius;
  background-color: #4472c4;
  color: #fff;
  display: flex;
  font-size: 1.5rem;
  margin-left: auto;
  margin-top: 1rem;
  padding: 0.75rem;
  text-transform: uppercase;
}
.login--button:hover {
  background-color: #4472c4e0;
  cursor: pointer;
}
.login--link {
  color: #3c69bd;
  font-size: 1.5rem;
  text-decoration: none;
}
input:focus {
  box-shadow: 0 0 0 0.125rem #d48a0b;
  outline: none;
}
.reset__message {
  text-align: right;
  margin-top: 1rem;
  color: $resultCorrect;
}
</style>
