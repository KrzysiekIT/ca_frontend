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
    <button type="submit" class="login--button">
      Login
    </button>
    <a class="login--link" href="#">Zapomniałeś hasła?</a>
  </form>
</template>
<script>
export default {
  middleware: "auth",
  meta: {
    auth: { authority: 3 }
  },
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
        trainer: "/trainer",
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
          this.alert = { type: "success", message: result.data.message };
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
<style scope>
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
  border-radius: 0.75rem;
  display: block;
  font-size: 1.5rem;
  padding: 0.75rem;
}
.login--label__input {
  display: block;
  padding-bottom: 0.375rem;
}
.login--button {
  border: none;
  border-radius: 0.75rem;
  background-color: #4472c4;
  color: #fff;
  display: flex;
  font-size: 1.5rem;
  margin-left: auto;
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
</style>
