<template>
  <client-only>
    <section class="demo">
      <header class="demo__header">{{ $t("general.groups") }}</header>
      <div class="demo__tables">
        <div class="demo__table-box">
          <!-- <table class="lessons__table">
            <thead>
              <tr>
                <th colspan="0" class="lessons__table-header">
                  <a
                    :href="`lessons/board/${demoLesson.id}`"
                    class="link lessons__date"
                    title="Pokaż tablicę trenera"
                  >
                    <fa class="result__icon" icon="chalkboard-teacher" />
                  </a>
                  <button
                    :title="$t('general.new_lesson_description')"
                    class="lessons__button"
                    @click="startNewLesson(demoLesson.id)"
                  >
                    <img
                      src="~/assets/images/play.svg"
                      alt="Start"
                      height="24"
                    />
                  </button>
                </th>
              </tr>
            </thead>
          </table> -->
          <table class="table demo__table">
            <thead>
              <tr>
                <th
                  class="table__td"
                  v-for="(column, columnIndex) in columns"
                  :key="'column' + columnIndex"
                >
                  {{ column.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="table__td"></td>
                <td class="table__td">
                  <client-only>
                    <v-date-picker v-model="newDemo.day">
                      <template v-slot="{ inputValue, inputEvents }">
                        <input
                          :value="inputValue"
                          v-on="inputEvents"
                          class="date__input"
                        />
                      </template>
                    </v-date-picker>
                  </client-only>
                  <select v-model="newDemo.hour">
                    <option v-for="hour in hours" :value="hour" :key="hour">
                      {{ hour }}
                    </option>
                  </select>
                </td>
                <td class="table__td">
                  <select v-model="newDemo.trainerId">
                    <option
                      v-for="trainer in trainers"
                      :value="trainer.id"
                      :key="trainer.id"
                    >
                      {{ trainer.fullName }}
                    </option>
                  </select>
                </td>
                <td class="table__td">
                  <input v-model.number="newDemo.studentsNumber" />
                </td>
                <td class="demo__add">
                  <button
                    class="demo__button-img add-button"
                    @click="addLesson"
                  >
                    <fa icon="plus-circle" class="demo__fa-icon" />
                    <span class="add-text">{{
                      $t("general.add_demo_lesson")
                    }}</span>
                  </button>
                </td>
              </tr>
              <tr
                v-for="(demoLesson, demoLessonIndex) in demoLessons"
                :key="demoLesson.id"
              >
                <td
                  v-for="(column, columnIndex) in columns"
                  :key="'column' + columnIndex + demoLesson.id"
                  class="table__td"
                >
                  {{ getTableData(column.name, demoLessonIndex) }}
                </td>
                <td class="demo__actions">
                  <button
                    class="demo__button-text"
                    title="Generuj link"
                    @click="generateLink(demoLesson)"
                  >
                    {{ $t("general.generate") }}
                  </button>
                  <a
                    class="demo__button-img"
                    :title="$t('general.show_trainer_board')"
                    :href="`lessons/board?id=${demoLesson.link}`"
                  >
                    <img
                      src="~/assets/images/play.svg"
                      alt="Start"
                      height="24"
                    />
                  </a>
                  <button
                    class="demo__button-img"
                    title="Usuń lekcję"
                    @click="removeDemo(demoLesson.id)"
                  >
                    <img
                      src="~/assets/images/stop.svg"
                      alt="Stop"
                      height="32"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <ol class="demo__list">
            <span class="demo__list-label">{{
              $t("general.generated_links")
            }}</span>
            <li
              class="demo__item"
              v-for="demoLesson in generatedLinks"
              :key="demoLesson.id"
            >
              <client-only>
                <span class="demo__link" :href="demoLesson.link">
                  {{ getFullLink(demoLesson.link) }}
                </span>
              </client-only>
            </li>
          </ol>
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
export default {
  async fetch() {
    const toFetch = [
      this.$store.dispatch("auth/request", {
        method: "get",
        url: "trainers"
      }),
      this.$store.dispatch("auth/request", {
        method: "get",
        url: "demo"
      })
    ];
    const apiReponses = await Promise.all(toFetch);
    let [trainers, demo] = apiReponses;
    demo = demo.data;
    trainers = trainers.data;

    this.trainers = trainers.map(({ id, name, surname }) => {
      return {
        id,
        fullName: `${name} ${surname}`
      };
    });

    this.demoLessons = demo.map(demoLesson => {
      return {
        ...demoLesson,
        date: `${demoLesson.day} ${demoLesson.hour}`,
        trainerId: demoLesson.trainer_id,
        studentsNumber: demoLesson.students_number
      };
    });
  },
  computed: {
    generatedLinks() {
      return this.demoLessons.filter(demoLesson => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        const yyyy = today.getFullYear();

        const todayDate = yyyy + "-" + mm + "-" + dd;

        const isTheSameDay = todayDate === demoLesson.date.substring(0, 10);

        return demoLesson.link && isTheSameDay;
      });
    }
  },
  data() {
    return {
      newDemo: {
        hour: "12:00",
        day: new Date(),
        trainerId: 3,
        studentsNumber: 4
      },
      hours: (() => {
        const hours = Array.from(Array(24).keys());
        const minutes = ["00", "15", "30", "45"];
        const options = [];
        let hourIndex = 0;
        const hoursLength = hours.length;
        const minutesLength = minutes.length;
        for (hourIndex; hourIndex < hoursLength; hourIndex++) {
          let minuteIndex = 0;
          for (minuteIndex; minuteIndex < minutesLength; minuteIndex++) {
            const hourToPush = `${hours[hourIndex]}:${minutes[minuteIndex]}`;
            options.push(hourToPush);
          }
        }
        return options;
      })(),
      demoLessons: [],
      trainers: [],
      columns: [
        { name: "lp", label: "Lp. " },
        { name: "datetime", label: this.$t("general.datetime") },
        { name: "trainer", label: this.$t("general.trainer_full_name") },
        { name: "studentNumber", label: this.$t("general.number_of_students") }
      ]
    };
  },
  methods: {
    getFullLink(link) {
      if (process.client) {
        const host = window.location.protocol + "//" + window.location.host;
        return `${host}/demo?demo_id=${link}`;
      }
    },
    async addLesson() {
      const newDemo = {};
      newDemo.hour = this.newDemo.hour;
      newDemo.trainer_id = this.newDemo.trainerId;
      newDemo.students_number = this.newDemo.studentsNumber;
      let dayToSend = new Date(
        this.newDemo.day.getTime() -
          this.newDemo.day.getTimezoneOffset() * 60000
      ).toISOString();
      dayToSend = dayToSend.slice(0, 10);
      newDemo.day = dayToSend;
      await this.$store.dispatch("auth/request", {
        method: "post",
        url: `demo`,
        data: { values: newDemo }
      });

      let newDemos = await this.$store.dispatch("auth/request", {
        method: "get",
        url: "demo"
      });
      newDemos = newDemos.data;
      this.demoLessons = newDemos.map(demoLesson => {
        return {
          ...demoLesson,
          date: `${demoLesson.day} ${demoLesson.hour}`,
          trainerId: demoLesson.trainer_id,
          studentsNumber: demoLesson.students_number
        };
      });
    },
    async removeDemo(demoId) {
      await this.$store.dispatch("auth/request", {
        method: "delete",
        url: `demo/${demoId}`
      });
      let newDemos = await this.$store.dispatch("auth/request", {
        method: "get",
        url: "demo"
      });
      newDemos = newDemos.data;
      this.demoLessons = newDemos.map(demoLesson => {
        return {
          ...demoLesson,
          date: `${demoLesson.day} ${demoLesson.hour}`,
          trainerId: demoLesson.trainer_id,
          studentsNumber: demoLesson.students_number
        };
      });
    },
    async generateLink(demo) {
      if (demo.link) {
        return;
      }
      await this.$store.dispatch("auth/request", {
        method: "patch",
        url: `demo/generate/${demo.id}`
      });
      let newDemo = await this.$store.dispatch("auth/request", {
        method: "get",
        url: "demo"
      });
      newDemo = newDemo.data;
      this.demoLessons = newDemo.map(demoLesson => {
        return {
          ...demoLesson,
          date: `${demoLesson.day} ${demoLesson.hour}`,
          trainerId: demoLesson.trainer_id,
          studentsNumber: demoLesson.students_number
        };
      });
    },
    getTableData(name, lessonIndex) {
      const handleName = {
        lp: lessonIndex => {
          return lessonIndex + 1;
        },
        datetime: lessonIndex => {
          return this.demoLessons[lessonIndex].date;
        },
        trainer: lessonIndex => {
          const selectedTrainer = this.demoLessons[lessonIndex].trainerId;
          const trainerIndex = this.trainers
            .map(trainer => trainer.id)
            .indexOf(selectedTrainer);
          return this.trainers[trainerIndex]?.fullName;
        },
        studentNumber: lessonIndex => {
          return this.demoLessons[lessonIndex].studentsNumber;
        }
      };

      return handleName[name]?.(lessonIndex);
    }
  }
};
</script>
<style lang="scss" scoped>
.demo__table-box {
  margin-bottom: 5rem;
  width: 90%;
}
.demo {
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

  &__generate {
    background-color: $yellow;
    border-radius: $appRadius;
    color: $black;
    padding: 0.25rem 1rem;
    margin-left: 1rem;
  }

  &__actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
  }

  &__button-text {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $mainBackground;
    background-color: $yellow;
    border: none;
    border-radius: $appRadius;
    padding: 0.25rem 0.25rem;

    &:hover {
      cursor: pointer;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(2px);
    }
  }

  &__button-img {
    background-color: transparent;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(2px);
    }
  }

  &__list {
    background-color: $grayedWhite;
    color: $mainBackground;
    border-radius: $appRadius;
    margin-top: 2rem;
    display: inline-block;
    padding-right: 2rem;
    padding-bottom: 2rem;
    padding-left: 4rem;
  }

  &__list-label {
    font-size: 2rem;
  }

  &__item {
    &:not(:last-child) {
      margin-bottom: 0.25rem;
    }
  }

  &__link {
    color: $mainBackground;
  }

  &__fa-icon {
    color: $optionsBackground;
    transform: scale(1.5);
    margin-right: 0.25rem;
  }
}
.date__input {
  width: 6rem;
}
.add-button {
  width: 100%;
  text-align: center;
}
.add-text {
  color: $grayedWhite;
}
</style>
