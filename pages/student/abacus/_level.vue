<template>
  <div class="abacus">
    <div class="abacus__header">
      <div class="abacus__header--main">
        <span class="abacus__label">LEKCJA</span>
        <score-box
          :presences="{ present: $route.params['level'], total: 48 }"
        />
        <mark class="abacus__note">NOTATKA</mark>
      </div>
      <div class="abacus__header--sub">
        <span class="abacus__title">TYTUŁ LEKCJI</span>
      </div>
    </div>
    <div class="abacus__box"></div>
  </div>
</template>
<style lang="scss" scope>
.abacus__header--main {
  align-items: center;
  display: flex;
  font-size: 1.5rem;
}
.abacus__label {
  margin-right: 1rem;
}
.abacus__note {
  background-color: $yellow;
  border-radius: $appRadius;
  color: $black;
  padding: 0.25rem 1rem;
  margin-left: 1rem;
}
.abacus__header--sub {
  margin: 2rem 0;
}
.abacus__title {
  font-size: 1.25rem;
}
</style>
