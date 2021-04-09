<template>
  <div class="account">
    <div class="account__header">
      <div>
        <span class="account__header-label">Termin zajęć</span>
        <strong>Czwartek 18:00</strong>
      </div>
      <div>
        <span class="account__header-label">Trener</span>
        <strong>Imię Nazwisko</strong>
      </div>
      <div>
        <span class="account__header-label">Kontakt</span>
        <strong>500 600 500</strong>
      </div>
    </div>
    <div class="account__box">
      <section class="account__box--inner">
        <img src="~/assets/images/money.svg" alt="Sad icon" height="64" />
        <img src="~/assets/images/sad.svg" alt="Sad icon" height="64" />
        <div>
          <span class="payments__label">STATUS</span>
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
      <section class="account__box--inner attendance">
        <div class="attendance__header">
          <div class="attendance__score-box">
            <div class="attendance__score attendance__score--first">
              4<sup class="attendacne__sup">⭐</sup>
            </div>
            <div class="attendance__score">2</div>
          </div>
          <div class="attendance__title">STOPIEŃ REALIZACJI PROGRAMU</div>
        </div>
        <table class="attendance__table">
          <thead>
            <tr>
              <th class="attendance__table-td" scope="col">Miesiąc</th>
              <th class="attendance__table-td" scope="col">Lekcja 1</th>
              <th class="attendance__table-td" scope="col">Lekcja 2</th>
              <th class="attendance__table-td" scope="col">Lekcja 3</th>
              <th class="attendance__table-td" scope="col">Lekcja 4</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="attendance__table-td">1</td>
              <td class="attendance__table-td"><Absent /></td>
              <td class="attendance__table-td"><Present /></td>
              <td class="attendance__table-td"><Present /></td>
              <td class="attendance__table-td"><Excused /></td>
            </tr>
            <tr>
              <td class="attendance__table-td">2</td>
              <td class="attendance__table-td">abc</td>
              <td class="attendance__table-td">abc</td>
              <td class="attendance__table-td">abc</td>
              <td class="attendance__table-td">abc</td>
            </tr>
          </tbody>
        </table>
      </section>
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
  padding: 1.5rem;
}
.attendance {
  flex: 1 1 auto;
}
.attendance__header {
  display: flex;
}
.attendance__score-box {
  display: flex;
}
.attendance__score {
  font-size: 2rem;
  background-color: $darkBackground;
  padding: 0.75rem;
}
.attendance__score--first {
  border-right: 0.125rem solid $lineColor;
  color: #d4af37;
}
.attendance__title {
  align-items: flex-end;
  display: flex;
  justify-content: center;
  width: 100%;
}
.attendacne__sup {
  font-size: 50%;
  position: relative;
  top: -1.25rem;
  vertical-align: baseline;
}
.attendance__table {
  border-collapse: collapse;
  border-style: hidden;
  margin-top: 2rem;
  min-width: 100%;
}
.attendance__table-td {
  border: 0.125rem solid $lineColor;
  cursor: default;
  padding: 0.5rem;
  text-align: center;
}
</style>
