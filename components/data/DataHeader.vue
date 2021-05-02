<template>
  <header class="header">
    <add-button
      :baseTable="baseTable"
      :models="models"
      :addUrl="apiUrl"
      :label="label"
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
    },
    apiUrl: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
  }
};
</script>
<style lang="scss" scoped>
.header {
  padding-bottom: 1rem;
}
</style>
