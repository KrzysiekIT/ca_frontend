<template>
  <header class="header">
    <add-button
      :baseTable="baseTable"
      :models="models"
      addUrl="students"
      label="Dodaj ucznia"
    />
  </header>
</template>
<script>
export default {
  props: {
    baseTable: {
      type: Array,
      required: true
    },
    models: {
      type: Object,
      required: true
    }
  }
};
</script>
<style lang="scss" scoped>
.header {
  padding-bottom: 1rem;
}
</style>
