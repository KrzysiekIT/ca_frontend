<template>
  <div>
    ZAAKCEPTUJ TERMSY!!! {{user}}
  </div>
</template>

<script>
import user from "~/mixins/user.js";
export default {
  middleware: "auth",
  meta: {
    auth: { authority: 8 }
  },
  mixins: [user],
  layout: "default"
};
</script>
