<template>
  <form @submit.prevent="submit" class="login--form">
    <!-- <p v-if="alert">{{ alert.message }}</p> -->
    <label class="login--label">
      <span class="login--label__input">Nazwa użytkownika</span>
      <input label="Email" v-model="email" class="login--input" />
    </label>
    <label class="login--label">
      <span class="login--label__input">Hasło</span>
      <input
        label="Password"
        v-model="password"
        type="password"
        class="login--input"
      />
    </label>
    <button type="submit" class="button button--right button--spacious">
      Login
    </button>
    <span class="login__info login__info--bad" v-if="alert">Niepoprawne dane</span>
    <nuxt-link class="login--link" to="login/reset">Zapomniałeś hasła?</nuxt-link>
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
      loading: false,
      nextPage: {
        superadmin: "/admin",
        admin: "/admin",
        trainer: "/admin",
        student: "/student"
      }
    };
  },
  methods: {
    submit() {
      this.alert = null;
      this.loading = true;
      this.$store
        .dispatch("auth/login", {
          email: this.email,
          password: this.password
        })
        .then(result => {
          /* this.alert = { type: "success", message: result.data.message }; */
          this.loading = false;
          const role = result.data.user.role.name;
          const nextPage = this.nextPage[role];
          this.$router.push(nextPage);
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
  display: block;
  font-size: 1.5rem;
  padding-bottom: 0.75rem;
}
.login--input {
  border: none;
  border-radius: $appRadius;
  display: block;
  font-size: 1.5rem;
  padding: 0.75rem;
}
.login--label__input {
  display: block;
  padding-bottom: 0.375rem;
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
.login__info {
  display: block;
  margin: 1rem 0;
  font-size: 1.25rem;
}
.login__info--bad {
  color: $red;
}
</style>
