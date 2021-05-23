<template>
  <div>{{ payments }}</div>
</template>
<script>
export default {
  async fetch() {
    const payments = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `payments`
    });
    this.payments = payments.data;
  },
  data() {
    return {
      payments: []
    };
  }
};
</script>
