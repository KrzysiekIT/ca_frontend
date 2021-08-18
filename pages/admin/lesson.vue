<template>
  <div>
    <nuxt-link to="/admin/lessons" class="back">
      <fa icon="arrow-left" />
    </nuxt-link>
    <nuxt-child />
  </div>
</template>
<style lang="scss" scoped>
.back {
  font-size: 4rem;
  color: $green;
}
</style>
