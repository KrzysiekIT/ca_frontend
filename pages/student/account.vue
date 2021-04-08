<template>
  <div class="account">
    <div class="header">
      <div>
        <label class="header__label">Termin zajęć</label>
        <strong class="header__label-value">Czwartek 18:00</strong>
      </div>
      <div>
        <label class="header__label">Trener</label>
        <strong class="header__label-value">Imię Nazwisko</strong>
      </div>
      <div>
        <label class="header__label">Kontakt</label>
        <strong class="header__label-value">500 600 500</strong>
      </div>
    </div>
    <div class="account__box">
      <div class="account__box--inner">
        <section class="payments">
          <img src="~/assets/images/money.svg" alt="Sad icon" height="64" />
          <img src="~/assets/images/sad.svg" alt="Sad icon" height="64" />
          <div>
            <label class="payments__label">STATUS</label>
            <strong
              class="payments__label-value payments__label-value--suspended"
              >AKTYWNY</strong
            >
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
      </div>
      <div class="account__box--inner">abc</div>
      <div class="account__box--inner">abc</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$boxPadding: 0.5rem;
.header {
  display: flex;
  justify-content: space-between;
  padding: $boxPadding;
}
.header__label-value {
  color: #00b0f0;
  padding-left: 1rem;
}
.header__label-value {
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
.account__box {
  display: flex;
}
.account__box--inner {
  padding: $boxPadding;
}
</style>
