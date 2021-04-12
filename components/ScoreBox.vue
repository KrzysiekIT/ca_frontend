<template>
  <div class="score-box">
    <div class="score-box__score score-box__score--first">
      {{ presences.present }}<sup class="score-box__sup">⭐</sup>
    </div>
    <div class="score-box__score">{{ presences.total }}</div>
  </div>
</template>
<script>
export default {
  props: {
    presences: {
      type: Object,
      default: {
        present: 0,
        total: 0
      }
    }
  }
};
</script>
<style lang="scss" scope>
.score-box {
  display: flex;
}
.score-box__score {
  font-size: 2rem;
  background-color: $darkBackground;
  padding: 0.75rem;
}
.score-box__score--first {
  border-right: 0.125rem solid $lineColor;
  color: #d4af37;
}
.score-box__sup {
  font-size: 50%;
  position: relative;
  top: -1.25rem;
  vertical-align: baseline;
}
</style>
