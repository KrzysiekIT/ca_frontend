<template>
  <div>
    <h1>Log In</h1>
    <form @submit.prevent="submit">
      <p v-if="alert">{{ alert.message }}</p>
      <label class="login--label">
        Email
        <input label="Email" v-model="email" />
      </label>
      <label class=".login--label">
        Password
        <input label="Password" v-model="password" type="password" />
      </label>
      <button type="submit">
        Log In
      </button>
    </form>
  </div>
</template>
<script>
export default {
  layout: "fullscreen",
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
}
</style>
