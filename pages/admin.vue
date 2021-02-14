<template>
  <div>
    <h1>Admin page</h1>
    <p v-if="user">Hello, {{ user.email }}</p>
    <p v-else>The user is not authenticated!</p>
    <a href="/">Main Page</a>
    <button @click="$store.dispatch('auth/fetch')">Check Me</button>
    <button @click="$store.dispatch('auth/users')">Check users (superadmin only)</button>
    <button @click="logOut">Log Out</button>
  </div>
</template>
<script>
export default {
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/reset").then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>
