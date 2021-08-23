<template>
  <div class="sm">
    <nuxt-link :to="'#'" class="sm__game"
      >Łańcuchowa Metoda Skojarzeń</nuxt-link
    >
    <nuxt-link :to="'#'" class="sm__game"
      >Przygotowanie do zapamiętywania cyfr</nuxt-link
    >
    <nuxt-link :to="'#'" class="sm__game"
      >Zapamiętywanie cyfr jednocyfrowych</nuxt-link
    >
    <nuxt-link :to="'#'" class="sm__game">Podstawy pałacu pamięci</nuxt-link>
    <nuxt-link :to="'#'" class="sm__game">Zaawansowany pałac pamięci</nuxt-link>
    <nuxt-link :to="'#'" class="sm__game">Technika Słów Zastępczych</nuxt-link>
    <nuxt-link :to="'#'" class="sm__game">Główny System Pamięciowy</nuxt-link>
    <nuxt-link :to="'#'" class="sm__game">Definicje i daty</nuxt-link>
    <nuxt-link :to="'#'" class="sm__game">Imiona i nazwiska</nuxt-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.sm {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  gap: 1rem;

  &__game {
    text-decoration: none;
    color: $white;
    display: block;
    background-color: $resultNeutralBlue;
    border-radius: $appRadius;
    padding: 1rem;
    box-shadow: 1rem 2rem 4rem $black;

    &:hover {
      background-color: lighten($resultNeutralBlue, 10);
    }

    &:active {
      transform: translateY(2px);
    }

    &:focus {
      outline: 0.125rem solid $darkYellow;
    }
  }
}
</style>
