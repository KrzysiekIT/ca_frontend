<template>
  <section class="lessons">
    <header class="lessons__header">
      GRUPY
    </header>
    <div class="lessons__tables">
      <div class="lessons__table-box">
        <table class="lessons__table">
          <thead>
            <tr>
              <th colspan="100%" class="lessons__table-header">
                <div class="lessons__date">
                  <img src="~/assets/images/play.svg" alt="Start" height="24" />
                  Środa 8:00
                </div>
                <lesson-link label="Zajęcia" link="link.do.zajec.pl"></lesson-link>
                <div>abc</div>
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.lessons {
  padding: 2rem 4rem;
  &__table-header {
    display: flex;
    justify-content: space-between;
  }

  &__table {
    width: 100%;
  }

  &__date {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
}
</style>
