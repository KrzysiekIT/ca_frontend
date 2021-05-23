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
              <th colspan="0" class="lessons__table-header">
                <a href="#" class="link lessons__date">
                  <img src="~/assets/images/play.svg" alt="Start" height="24" />
                  Środa 8:00
                </a>
                <lesson-link
                  label="Zajęcia"
                  link="link.do.zajec.pl"
                ></lesson-link>
                <div>Data zajęć</div>
              </th>
            </tr>
          </thead>
        </table>
        <table class="table lessons__table">
          <thead>
            <tr>
              <th
                class="table__td"
                v-for="({ type, options }, columnIndex) in columns"
                :key="'column' + columnIndex"
              >
                <component :is="type" :options="options" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in newStudents" :key="user.id">
              <td
                class="table__td"
                v-for="({ field, type }, columnIndex) in columns"
                :key="'column' + columnIndex"
              >
                <component
                  :is="type"
                  v-if="user[field]"
                  :options="{ label: user[field] }"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table class="lessons__table"><tfoot>
        <tr>
          <td style="text-align: right">77</td>
        </tr>
      </tfoot></table>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  components: {
    Absent: () => import("@/components/attendance/Absent.vue"),
    Excused: () => import("@/components/attendance/Excused.vue"),
    Present: () => import("@/components/attendance/Present.vue"),
    SimpleText: () => import("@/components/SimpleText.vue")
  },
  computed: {
    newStudents() {
      const newStudents = this.groups.map((student, index) => {
        return {
          index: index + 1,
          present: student.attendance === 2,
          absent: student.attendance === 1,
          excused: student.attendance === 0,
          ...student
        };
      });
      return newStudents;
    }
  },
  data() {
    return {
      columns: [
        { type: "simple-text", options: { label: "Lp." }, field: "index" },
        { type: "simple-text", options: { label: "Uczeń" }, field: "fullName" },
        { type: "present", field: "present" },
        { type: "excused", field: "excused" },
        { type: "absent", field: "absent" },
        {
          type: "simple-text",
          options: { label: "Telefon" },
          field: "phoneNumber"
        },
        { type: "simple-text", options: { label: "E-mail" }, field: "email" }
      ],
      groups: [
        {
          id: 1,
          fullName: "Jan Nowak",
          attendance: -1,
          phoneNumber: "123123123",
          email: "test@TEST.COM"
        },
        {
          id: 2,
          fullName: "Jan Nowak2",
          attendance: 1,
          phoneNumber: "123123123",
          email: "test@TEST.COM"
        },
        {
          id: 3,
          fullName: "Jan Nowak3",
          attendance: 2,
          phoneNumber: "123123123",
          email: "tesst@TEST.COM"
        },
        {
          id: 4,
          fullName: "Jan Nowak4",
          attendance: 1,
          phoneNumber: "123123123",
          email: "test@TEST.COM"
        },
        {
          id: 6,
          fullName: "Jan Nowak5",
          attendance: -1,
          phoneNumber: "123123123",
          email: "test@TEST.COM"
        },
        {
          id: 5,
          fullName: "Jan Nowak6",
          attendance: 0,
          phoneNumber: "123123123",
          email: "test@TEST.COM"
        },
        {
          id: 8,
          fullName: "Jan Nowak7",
          attendance: -1,
          phoneNumber: "123123123",
          email: "test@TEST.COM"
        }
      ]
    };
  }
};
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
    text-align: center;
  }

  &__date {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
}
</style>
