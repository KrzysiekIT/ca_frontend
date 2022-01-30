<template>
  <div>
    <button @click="$router.back()" class="back">
      <fa icon="arrow-left" /> {{ $t('general.back')}}
    </button>
    <nuxt-child />
  </div>
</template>
<style lang="scss" scoped>
.back {
  display: inline-block;
  font-size: 2rem;
  color: $green;
  text-decoration: none;
  margin-bottom: 2rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
}
</style>
