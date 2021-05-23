<template>
  <span>{{ options.label }}</span>
</template>
<script>
export default {
  props: {
    options: {
      required: true,
      type: Object
    }
  }
};
</script>
