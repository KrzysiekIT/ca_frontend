<template>
  <client-only>
    <section class="lessons">
      <ul class="activities">
        <li class="activities__item">
          <nuxt-link
            class="activities__link"
            :to="localePath('/admin/lesson/abacus')"
          >
            <img
              src="~/assets/images/abacus.png"
              alt="Abacus icon"
              class="activities__image"
            />
          </nuxt-link>
        </li>
        <li class="activities__item">
          <nuxt-link
            class="activities__link"
            :to="localePath('/admin/lesson/anzan')"
          >
            <img
              src="~/assets/images/anzan.png"
              alt="Anzan icon"
              class="activities__image"
            />
          </nuxt-link>
        </li>
        <li class="activities__item">
          <img
            src="~/assets/images/supermemory.png"
            alt="Supermemory icon"
            class="activities__image"
          />
        </li>
        <li class="activities__item">
          <nuxt-link
            class="activities__link"
            :to="localePath('/admin/lesson/fast-reading')"
          >
            <img
              src="~/assets/images/fast_reading.png"
              alt="Abacus icon"
              class="activities__image"
            />
          </nuxt-link>
        </li>
        <li class="activities__item">
          <nuxt-link
            class="activities__link"
            :to="localePath('/admin/lesson/movies')"
          >
            <img
              src="~/assets/images/movies.png"
              alt="Movies icon"
              class="activities__image"
            />
          </nuxt-link>
        </li>
      </ul>
      <header class="lessons__header">{{ $t("general.groups") }}</header>
      <p class="lessons__no-groups" v-if="noGroups">
        {{ $t("general.no_groups") }}
      </p>
      <div class="lessons__tables">
        <div class="lessons__table-box" v-for="group in groups" :key="group.id">
          <table class="lessons__table">
            <thead>
              <tr>
                <th colspan="0" class="lessons__table-header">
                  <a
                    :href="`lessons/board?id=${group.id}`"
                    class="link lessons__date"
                    :title="$t('general.show_trainer_board')"
                  >
                    <fa class="result__icon" icon="chalkboard-teacher" />
                    {{ `${group.lesson_hour}` }}
                    {{ $t(`general.${days[group.lesson_day]}`) }}
                  </a>
                  <button
                    :title="$t('general.new_lesson_description')"
                    class="lessons__button"
                    @click="startNewLesson(group.id)"
                  >
                    <img
                      src="~/assets/images/play.svg"
                      alt="Start"
                      height="24"
                    />
                  </button>
                  <lesson-link
                    :label="$t('general.lessons')"
                    :link="group.lesson_link"
                  ></lesson-link>
                  <div>
                    {{ $t("general.lesson_day") }}<br />{{
                      getLastLessonDate(group.id)
                    }}
                  </div>
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
                  :key="'column' + columnIndex + group.id"
                >
                  <component :is="type" :options="options" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="user in getStudents(group.id)"
                :key="user.id + group.id"
              >
                <td
                  class="table__td"
                  :class="
                    ['present', 'excused', 'absent'].includes(type)
                      ? 'pointer'
                      : ''
                  "
                  v-for="({ field, type }, columnIndex) in columns"
                  :key="'column' + columnIndex + group.id"
                  @click="
                    ['present', 'excused', 'absent'].includes(type) &&
                      setAttendance(user, columnIndex)
                  "
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
          <!-- <table class="lessons__table">
            <tfoot>
              <tr>
                <td style="text-align: right">77</td>
              </tr>
            </tfoot>
          </table> -->
        </div>
      </div>
    </section>
  </client-only>
</template>
<script>
import user from "~/mixins/user.js";
const days = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
  0: "sunday"
};
export default {
  mixins: [user],
  components: {
    Absent: () => import("@/components/attendance/Absent.vue"),
    Excused: () => import("@/components/attendance/Excused.vue"),
    Present: () => import("@/components/attendance/Present.vue"),
    SimpleText: () => import("@/components/SimpleText.vue")
  },
  async fetch() {
    let urlToGroup = "groups/my";
    if (
      this.user.role.name === "admin" ||
      this.user.role.name === "superadmin"
    ) {
      urlToGroup = "groups";
    }
    const myGroups = await this.$store.dispatch("auth/request", {
      method: "get",
      url: urlToGroup
    });
    this.groups = myGroups.data;
    if (this.groups.length === 0) {
      this.noGroups = true;
    }
    let groupsIds = this.groups.map(group => group.id).join(",");
    if (groupsIds === "") {
      groupsIds = "0";
    }
    const lastLessons = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `lessons/last/${groupsIds}`
    });
    this.lastLessons = lastLessons?.data?.data;

    const lessonsIds = this.lastLessons.map(lesson => lesson.id).join(",");

    let presences = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `presences/multiplelessons/${lessonsIds}`
    });
    presences = presences.data;

    this.presences = presences;

    const students = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `students/multiplegroups/${groupsIds}`
    });
    this.students = students.data.map((student, index) => {
      const newPresences = presences.filter(
        presence => presence.user_id === student.id
      );
      let attendance;
      if (newPresences[0]) {
        attendance = newPresences[0].status;
      } else {
        attendance = -1;
      }
      return {
        id: student.id,
        group_id: student.group_id,
        fullName: `${student.name} ${student.surname}`,
        attendance: -1,
        phoneNumber: student.parent_phone_number,
        email: student.email,
        index: index + 1,
        attendance,
        present: attendance === 2,
        absent: attendance === 0,
        excused: attendance === 1
      };
    });
  },
  methods: {
    async setAttendance(user, columnIndex) {
      const columnToStatus = {
        4: 0,
        3: 1,
        2: 2
      };
      const filteredPresences = this.presences.filter(
        presence => presence.user_id === user.id
      );
      if (filteredPresences.length < 1) {
        return;
      }
      const studentIndex = this.students.indexOf(user);

      this.$set(this.students, studentIndex, {
        ...this.students[studentIndex],
        attendance: columnToStatus[columnIndex],
        present: columnToStatus[columnIndex] === 2,
        absent: columnToStatus[columnIndex] === 0,
        excused: columnToStatus[columnIndex] === 1
      });

      const lastPresence = filteredPresences[0];
      await this.$store.dispatch("auth/request", {
        method: "patch",
        url: `presences/${lastPresence.id}`,
        data: { newValues: { status: columnToStatus[columnIndex] } }
      });
    },
    async startNewLesson(groupId) {
      const newLesson = await this.$store.dispatch("auth/request", {
        method: "post",
        url: `lessons/new/${groupId}`,
        data: { date: new Date() }
      });
      if (newLesson.status === 200) {
        this.$fetch();
      }
    },
    getLastLessonDate(groupId) {
      if (!this.lastLessons) {
        return;
      }
      const filteredLessons = this.lastLessons.filter(
        lesson => lesson.group_id === groupId
      );
      if (filteredLessons.length < 1) {
        return;
      }
      const lastLessonDate = filteredLessons[0].date;
      const formattedDate = lastLessonDate.substring(0, 10);
      return formattedDate;
    },
    getStudents(groupId) {
      if (!this.students) {
        return;
      }
      const filteredStudents = this.students.filter(
        student => student.group_id === groupId
      );
      if (filteredStudents.length < 1) {
        return;
      }
      return filteredStudents;
    }
  },
  data() {
    return {
      noGroups: false,
      days,
      columns: [
        { type: "simple-text", options: { label: "Lp." }, field: "index" },
        {
          type: "simple-text",
          options: { label: this.$t("general.student") },
          field: "fullName"
        },
        { type: "present", field: "present" },
        { type: "excused", field: "excused" },
        { type: "absent", field: "absent" },
        {
          type: "simple-text",
          options: { label: this.$t("general.phone_number") },
          field: "phoneNumber"
        },
        {
          type: "simple-text",
          options: { label: this.$t("general.email_adress") },
          field: "email"
        }
      ],
      groups: [],
      lastLessons: [],
      students: [],
      presences: [],
      users: [
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
.activities {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  gap: 2rem;
  margin-bottom: 2rem;

  &__item {
    padding: 0;
    margin: 0;
  }

  &__image {
    height: 3.2rem;
  }
}
.lessons__table-box {
  margin-bottom: 5rem;
}
.lessons {
  padding: 2rem 4rem;

  &__no-groups {
    margin-top: 2rem;
  }

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

  &__button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
}
.pointer {
  cursor: pointer;
}
</style>
