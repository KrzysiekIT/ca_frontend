<template>
  <div class="account">
    <div class="account__header">
      <div>
        <label class="account__header-label">Termin zajęć</label>
        <strong>Czwartek 18:00</strong>
      </div>
      <div>
        <label class="account__header-label">Trener</label>
        <strong>Imię Nazwisko</strong>
      </div>
      <div>
        <label class="account__header-label">Kontakt</label>
        <strong>500 600 500</strong>
      </div>
    </div>
    <div class="account__box">
      <section>
        <img src="~/assets/images/money.svg" alt="Sad icon" height="64" />
        <img src="~/assets/images/sad.svg" alt="Sad icon" height="64" />
        <div>
          <label class="payments__label">STATUS</label>
          <strong
            class="payments__label-value payments__label-value--suspended"
          >
            AKTYWNY
          </strong>
        </div>
        <div class="payments__icon-label">
          <img
            src="~/assets/images/terms_of_use.svg"
            alt="User icon white"
            height="32"
          />
          <span>KONTO UCZNIA</span>
        </div>
      </section>
      <section class="account__box--inner year">
        <ul class="year__ul">
          <li class="year__li">ROK 1</li>
          <li class="year__li">ROK 2</li>
        </ul>
      </section>
      <section class="account__box--inner year">abc</section>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$boxPadding: 0.5rem;
.account__header {
  display: flex;
  justify-content: space-between;
  padding: $boxPadding;
}
.account__header-label {
  color: #00b0f0;
  padding-left: 1rem;
}
.payments__label-value {
  padding-left: 1rem;
}
.payments__icon-label {
  align-items: center;
  display: flex;
  padding: $boxPadding;
}
.payments__label-value--active {
  color: #00cc00;
}
.payments__label-value--suspended {
  color: #ffff00;
}
.year__ul {
  list-style-type: none;
  padding: 0;
}
.year__li:not(:first-child) {
  padding: 0.75rem 0;
}
.account__box {
  display: flex;
}
.account__box--inner {
  padding: $boxPadding;
}
</style>
