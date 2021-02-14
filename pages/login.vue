<template>
  <form @submit.prevent="submit">
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
    <button type="submit" class="login--button">
      Login
    </button>
    <a class="login--link" href="#">Zapomniałeś hasła?</a>
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
        .dispatch("auth/login", {
          email: this.email,
          password: this.password
        })
        .then(result => {
          this.alert = { type: "success", message: result.data.message };
          this.loading = false;
          this.$router.push("/admin");
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
<style scope>
.login--label {
  display: block;
  padding-bottom: 0.5rem;
}
.login--input {
  border: none;
  border-radius: 0.5rem;
  display: block;
  font-size: 1rem;
  padding: 0.5rem;
}
.login--label__input {
  display: block;
  padding-bottom: 0.25rem;
}
.login--button {
  border: none;
  border-radius: 0.5rem;
  background-color: #a4a4df;
  display: flex;
  font-size: 1rem;
  margin-left: auto;
  padding: 0.5rem;
  text-transform: uppercase;
}
.login--link {
  color: #5eb3c9;
  text-decoration: none;
}
.login--button:hover {
  background-color: #7e7ec7;
  cursor: pointer;
}
</style>
