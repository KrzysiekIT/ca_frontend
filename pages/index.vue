<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        <img src="~/assets/anims/logo-once.gif" alt="Start" height="256" />
      </h1>
      <div class="links">
        <a href="/login" class="button--green">
          Log in
        </a>
        <a href="/admin" class="button--grey">
          Admin
        </a>
        <a href="/student" class="button--grey">
          Student
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    const userIsLoggedIn = !!store?.state?.auth?.user;
    const role = store?.state?.auth?.user?.role?.name;
    if (userIsLoggedIn) {
      if (role === "student") {
        return redirect("/student");
      } else {
        return redirect("/admin");
      }
    } else {
      return redirect("/login");
    }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
