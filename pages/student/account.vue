<template>
  <div class="account">
    <div class="account__header">
      <div>
        <span class="account__header-label">{{
          $t("general.lesson_day")
        }}</span>
        <strong class="account__header-label--inline">
          {{ `${group.lesson_hour}` }}
          {{ $t(`general.${days[group.lesson_day]}`) }}
        </strong>
      </div>
      <div>
        <span class="account__header-label">{{ $t("general.trainer") }}</span>
        <strong class="account__header-label--inline">{{
          `${trainer.name} ${trainer.surname}`
        }}</strong>
      </div>
      <div>
        <span class="account__header-label">{{ $t("general.contact") }}</span>
        <strong class="account__header-label--inline">{{
          trainer.phone_number
        }}</strong>
      </div>
    </div>
    <div class="account__box">
      <section class="account__box--inner payments">
        <nuxt-link
          to="#"
          class="link"
          :title="$t('general.show_payments_data')"
        >
          <img src="~/assets/images/money.svg" alt="Money icon" height="64"
        /></nuxt-link>
        <img src="~/assets/images/sad.svg" alt="Sad icon" height="64" />
        <div>
          <span class="payments__label">{{ $t("general.status") }}</span>
          <span class="payments__label-value payments__label-value--suspended">
            {{ $t(`general.${statuses[user.status]}`) }}
          </span>
        </div>
        <nuxt-link to="/student/terms" class="link payments__icon-label">
          <img
            src="~/assets/images/terms_of_use.svg"
            alt="User icon white"
            height="32"
          />
          <span class="payments__terms">{{ $t("general.terms_of_use") }}</span>
        </nuxt-link>
      </section>
      <section class="account__box--inner year">
        <ul class="year__ul">
          <li class="year__li">ROK 1</li>
          <li class="year__li">ROK 2</li>
        </ul>
      </section>
      <section class="account__box--inner attendance">
        <div class="attendance__header">
          <score-box
            :presences="{
              present: numberOfPresences,
              total: attendance.length
            }"
          />
          <div class="attendance__title">STOPIEŃ REALIZACJI PROGRAMU</div>
        </div>
        <table class="attendance__table">
          <thead>
            <tr>
              <th class="attendance__table-td" scope="col">{{$t('general.month')}}</th>
              <th
                class="attendance__table-td"
                scope="col"
                v-for="lessonInMonthNumber in maxMonthAttendance"
                :key="'lesson' + lessonInMonthNumber"
              >
                {{ $t("general.lesson") }} {{ lessonInMonthNumber }}
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
                <component :is="ATTENDANCE_STATUS[presence.status]"></component>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
</template>
<script>
import user from "~/mixins/user.js";
const ATTENDANCE_STATUS = {
  0: "Absent",
  1: "Excused",
  2: "Present"
};
const days = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
  0: "sunday"
};
const statuses = {
  0: "blocked",
  1: "active",
  2: "unactive"
};
export default {
  mixins: [user],
  async fetch() {
    const userId = this.$store.state.auth.user.id;
    const presences = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `presences/${userId}`
    });
    this.attendance = presences.data;

    const group = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `groups/${this.user.group_id}`
    });
    this.group = group.data[0];

    const trainer = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `trainers/${this.group.trainer_id}`
    });
    this.trainer = trainer.data[0];
  },
  components: {
    Absent: () => import("@/components/attendance/Absent.vue"),
    Excused: () => import("@/components/attendance/Excused.vue"),
    Present: () => import("@/components/attendance/Present.vue")
  },
  computed: {
    maxMonthAttendance() {
      const months = this.attendance.map(
        presence => presence.lessons_month_number
      );
      const monthOccurences = [];
      monthOccurences.length = 12;
      monthOccurences.fill(0);
      months.forEach(month => monthOccurences[month]++);
      return months.length ? Math.max(...months) : 0;
    },
    numberOfPresences() {
      return this.attendance.filter(presence => presence.status === 2).length;
    }
  },
  data() {
    return {
      attendance: [],
      months: 12,
      ATTENDANCE_STATUS,
      days,
      group: {},
      trainer: {},
      statuses
    };
  },
  methods: {
    filterMonths(attendance, monthNumber) {
      const { maxMonthAttendance } = this;
      attendance = attendance.filter(
        presence => presence.lessons_month_number === monthNumber
      );
      let lessonNumber = 0;
      for (lessonNumber; lessonNumber < maxMonthAttendance; lessonNumber++) {
        if (
          attendance[lessonNumber]?.lessons_order_in_month ===
          lessonNumber + 1
        ) {
          continue;
        } else {
          attendance.splice(lessonNumber, 0, {});
        }
      }
      /* if (attendance.length < maxMonthAttendance) {
        let emptyIndex = attendance.length;
        attendance.length = maxMonthAttendance;
        for (emptyIndex; emptyIndex < maxMonthAttendance; emptyIndex++) {
          attendance[emptyIndex] = {};
        }
      } */
      return attendance.sort(
        (a, b) => a.lessons_order_in_month - b.lessons_order_in_month
      );
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
  white-space: nowrap;
}
.payments {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
}
.payments__icon-label {
  align-items: center;
  justify-content: center;
  display: flex;
  padding: $boxPadding;
}
.payments__label-value {
  text-transform: uppercase;
}
.payments__label-value--active {
  color: #00cc00;
}
.payments__label-value--suspended {
  color: #ffff00;
}
.payments__terms {
  text-transform: uppercase;
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
.attendance__title {
  align-items: flex-end;
  display: flex;
  justify-content: center;
  width: 100%;
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
