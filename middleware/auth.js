const areTermsAccepted = ({ store, route }) => {
  const termsAccepted = store.state.auth?.user?.terms_accepted;
  const roleName = store.state.auth?.user?.role?.name;
  const studentPath = /^\/student(\/|$)/.test(route.fullPath);
  const isTermsFirst = /^\/student\/terms-first(\/|$)/.test(route.fullPath);
  if (
    !termsAccepted &&
    roleName === "student" &&
    studentPath &&
    !isTermsFirst
  ) {
    return false;
  }
  return true;
};

export default function({ store, redirect, route }) {
  const userIsLoggedIn = !!store.state.auth.user;
  const authLevel = {
    page: route.meta[0]?.auth?.authority,
    user: store.state.auth?.user?.role?.bit ?? 0
  };
  if (!userIsLoggedIn && authLevel.page) {
    return redirect("/login");
  }
  if (!authLevel.page) {
    return Promise.resolve();
  }
  if (!(authLevel.page & authLevel.user)) {
    return redirect("/login");
  }

  if (!areTermsAccepted({ store, route })) {
    return redirect("/student/terms-first");
  }
  /* const userIsLoggedIn = !!store.state.auth.user;
  const urlRequiresAuth = /^\/admin(\/|$)/.test(route.fullPath);
  const urlRequiresNonAuth = /^\/login(\/|$)/.test(route.fullPath);
  if (!userIsLoggedIn && urlRequiresAuth) {
    return redirect("/login");
  }
  if (userIsLoggedIn && urlRequiresNonAuth) {
    return redirect("/admin");
  } */
  return Promise.resolve();
}
