<template>
  <div>
    <p v-if="user" style="color: darkblue;">Hello, {{ user.email }}</p>
    <p v-else>The user is not authenticated!</p>
    <a href="/">Main Page</a>
    <button @click="$store.dispatch('auth/fetch')">Check Me</button>
    <button @click="$store.dispatch('auth/users')">
      Check users (superadmin only)
    </button>
    <button @click="logOut">Log Out</button>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  meta: {
    auth: { authority: 8 }
  },
  layout: "default",
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
};
</script>
