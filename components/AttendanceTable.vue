<template>
  <table class="attendance__table">
    <thead>
      <tr>
        <th class="attendance__table-td" scope="col">
          {{ $t("general.month") }}
        </th>
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
          v-for="(presence, index) in filterMonths(attendance, monthNumber)"
          :key="'presence' + index"
        >
          <component :is="ATTENDANCE_STATUS[presence.status]"></component>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
const ATTENDANCE_STATUS = {
  0: "Absent",
  1: "Excused",
  2: "Present"
};
export default {
  props: {
    attendance: {
      type: Array,
      required: true
    }
  },
  components: {
    Absent: () => import("@/components/attendance/Absent.vue"),
    Excused: () => import("@/components/attendance/Excused.vue"),
    Present: () => import("@/components/attendance/Present.vue")
  },
  data() {
    return {
      ATTENDANCE_STATUS,
      maxMonthAttendance: 4,
      months: 12
    };
  },
  methods: {
    filterMonths(attendance, monthNumber) {
      const lessonsInMonth = 4;
      let newAttendance = [...attendance];
      newAttendance = newAttendance.sort(
        (a, b) => a.lessons_lesson_number - b.lessons_lesson_number
      );
      const minLessonNumber = monthNumber * lessonsInMonth - lessonsInMonth;
      newAttendance = newAttendance.splice(minLessonNumber, lessonsInMonth);
      let lessonNumber = 0;
      for (lessonNumber; lessonNumber < lessonsInMonth; lessonNumber++) {
        if (!newAttendance[lessonNumber]) {
          newAttendance.splice(lessonNumber, 0, {});
        }
      }
      return newAttendance;
    }
  }
};
</script>
<style lang="scss" scoped>
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
