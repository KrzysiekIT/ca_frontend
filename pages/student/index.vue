<template>
  <span class="title">{{ $t("general.welcome") }}</span>
</template>
<style lang="scss" scoped>
.title {
  padding: 5rem;
  margin-top: 5rem;
  font-size: 5rem;
  display: block;
  text-align: center;
  animation: zoom 1s ease-out;
  animation-fill-mode: backwards;
}

@keyframes zoom {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}
</style>
