<template>
  <div class="account">
    <div class="account__header">
      <div>
        <span class="account__header-label">Termin zajęć</span>
        <strong class="account__header-label--inline">Czwartek 18:00</strong>
      </div>
      <div>
        <span class="account__header-label">Trener</span>
        <strong class="account__header-label--inline">Imię Nazwisko</strong>
      </div>
      <div>
        <span class="account__header-label">Kontakt</span>
        <strong class="account__header-label--inline">500 600 500</strong>
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
          <score-box :presences="{present: numberOfPresences, total: attendance.length}" />
          <div class="attendance__title">STOPIEŃ REALIZACJI PROGRAMU</div>
        </div>
        <table class="attendance__table">
          <thead>
            <tr>
              <th class="attendance__table-td" scope="col">Miesiąc</th>
              <th
                class="attendance__table-td"
                scope="col"
                v-for="lessonInMonthNumber in maxMonthAttendance"
                :key="'lesson' + lessonInMonthNumber"
              >
                Lekcja {{ lessonInMonthNumber }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="monthNumber in months" :key="'month' + monthNumber">
              <td class="attendance__table-td">{{ monthNumber }}</td>
              <td
                class="attendance__table-td"
                v-for="(presence, index) in filterMonths(
                  attendance,
                  monthNumber
                )"
                :key="'presence' + index"
              >
                <component
                  v-bind:is="ATTENDANCE_STATUS[presence.status]"
                ></component>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>
<script>
const ATTENDANCE_STATUS = {
  0: "Absent",
  1: "Excused",
  2: "Present"
};
export default {
  async fetch() {
    const userId = this.$store.state.auth.user.id;
    const presences = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `presences/${userId}`
    });
    this.attendance = presences.data;
  },
  components: {
    Absent: () => import("@/components/attendance/Absent.vue"),
    Excused: () => import("@/components/attendance/Excused.vue"),
    Present: () => import("@/components/attendance/Present.vue")
  },
  computed: {
    maxMonthAttendance() {
      const months = this.attendance.map(presence =>
        new Date(presence.lessons_date).getMonth()
      );
      const monthOccurences = [];
      monthOccurences.length = 12;
      monthOccurences.fill(0);
      months.forEach(month => monthOccurences[month]++);
      return Math.max(...monthOccurences);
    },
    numberOfPresences() {
      return this.attendance.filter(presence => presence.status === 2).length;
    }
  },
  data() {
    return {
      attendance: [],
      months: 12,
      ATTENDANCE_STATUS
    };
  },
  methods: {
    filterMonths(attendance, monthNumber) {
      const { maxMonthAttendance } = this;
      monthNumber--;
      attendance = attendance.filter(presence => {
        const presenceMonthNumber = new Date(presence.lessons_date).getMonth();
        return presenceMonthNumber === monthNumber;
      });
      if (attendance.length < maxMonthAttendance) {
        let emptyIndex = attendance.length;
        attendance.length = maxMonthAttendance;
        for (emptyIndex; emptyIndex < maxMonthAttendance; emptyIndex++) {
          attendance[emptyIndex] = {};
        }
      }
      return attendance;
    }
  }
};
</script>
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
.account__header-label--inline {
  white-space:nowrap;
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
