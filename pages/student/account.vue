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
        <img
          src="~/assets/images/user_white.svg"
          alt="User icon white"
          height="32"
        />
        Konto ucznia
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
.account__box {
  display: flex;
}
.account__box--inner {
  padding: $boxPadding;
}
</style>
