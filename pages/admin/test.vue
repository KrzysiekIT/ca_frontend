<template>
  <div>
    <h1>Admin page</h1>
    <p v-if="user">Hello, {{ user.email }}</p>
    <p v-else>The user is not authenticated!</p>
    <a href="/">Main Page</a>
    <button @click="$store.dispatch('auth/fetch')">Check Me</button>
    <div
      style="margin-top: 50px; margin-bottom: 50px; grid-template-columns: 18% 18% 18% 18% 18%;"
    >
      <div style="display: inline-block;">
        <button @click="getUsers">
          Check users
        </button>
        <pre>{{ users.all }}</pre>
      </div>
      <div style="display: inline-block;">
        <button @click="getUser">
          Check user
        </button>
        <pre>{{ users.one }}</pre>
        <div v-for="userProperty in Object.keys(users.one)" :key="userProperty">
          <label
            >{{ userProperty }}:<input v-model="users.one[userProperty]"
          /></label>
        </div>
      </div>
      <div style="display: inline-block;">
        <button @click="editUser">
          Edit user
        </button>
        <div
          v-for="userProperty in Object.keys(users.edit)"
          :key="userProperty"
        >
          <label
            >{{ userProperty }}:<input v-model="users.edit[userProperty]"
          /></label>
        </div>
      </div>
      <div style="display: inline-block;">
        <button @click="createUser">
          Create user
        </button>
        <div
          v-for="userProperty in Object.keys(users.create)"
          :key="userProperty"
        >
          <label
            >{{ userProperty }}:<input v-model="users.create[userProperty]"
          /></label>
        </div>
      </div>
      <div style="display: inline-block;">
        <button @click="removeUser">
          Remove user
        </button>
        <div
          v-for="userProperty in Object.keys(users.remove)"
          :key="userProperty"
        >
          <label
            >{{ userProperty }}:<input v-model="users.remove[userProperty]"
          /></label>
        </div>
      </div>
    </div>
    <button @click="logOut">Log Out</button>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  meta: {
    auth: { authority: 3 }
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  data() {
    return {
      users: {
        all: [],
        remove: {
          id: 6
        },
        create: {
          password: "abc",
          name: "test",
          surname: "",
          role_id: "1",
          created_at: "2018-01-21 00:00:00"
        },
        edit: {
          id: 6,
          email: "@a",
          name: "test",
          surname: "",
          phone: "111111",
          role_id: "1",
          created_at: "2018-01-21 00:00:00"
        },
        one: {
          id: 6
        }
      }
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/reset").then(() => {
        this.$router.push("/");
      });
    },
    getUsers() {
      this.$store
        .dispatch("auth/request", {
          method: "get",
          url: "users"
        })
        .then(res => {
          this.users.all = res.data;
        });
    },
    getUser() {
      this.$store
        .dispatch("auth/request", {
          method: "get",
          url: `users/${this.users.one.id}`
        })
        .then(res => {
          this.users.one = res.data[0];
        });
    },
    editUser() {
      this.$store.dispatch("auth/request", {
        method: "put",
        url: `users/${this.users.one.id}`,
        data: { newValues: this.users.edit }
      });
    },
    createUser() {
      this.$store.dispatch("auth/request", {
        method: "post",
        url: "users",
        data: { values: this.users.create }
      });
    },
    removeUser() {
      this.$store.dispatch("auth/request", {
        method: "delete",
        url: `users/${this.users.remove.id}`
      });
    }
  }
};
</script>
