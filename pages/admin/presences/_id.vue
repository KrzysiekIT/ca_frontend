<template>
  <div>
    <div class="search-box">
      <div class="autocomplete-box" v-if="!currentId">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          {{ $t("general.trainer") }}:
          <autocomplete
            :items="trainers"
            type="multiple"
            @set="selectTrainer($event)"
          />
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          {{ $t("general.student") }}:
          <autocomplete
            :items="filteredStudents"
            type="multiple"
            @set="getAttendances($event)"
          />
        </div>
      </div>
      <span v-if="currentId">{{ $t("general.student") }}:</span>
      <div v-if="currentId">
        {{ currentStudent && currentStudent.name }}
        {{ currentStudent && currentStudent.surname }}
      </div>
    </div>
    <div></div>
    <div class="account__box">
      <section class="account__box--inner year">
        <ul class="year__ul">
          <li class="year__li">{{ $t("general.year") }} 1</li>
          <li class="year__li">{{ $t("general.year") }} 2</li>
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
          <div class="attendance__title">
            {{ $t("general.program_progress") }}
          </div>
        </div>
        <attendance-table :attendance="attendance" />
      </section>
    </div>
  </div>
</template>
<script>
export default {
  async fetch() {
    const students = await this.$store.dispatch("auth/request", {
      method: "get",
      url: "students"
    });
    this.students = students.data.map(student => {
      return { ...student, label: `${student.name} ${student.surname}` };
    });
    const trainers = await this.$store.dispatch("auth/request", {
      method: "get",
      url: "trainers"
    });
    this.trainers = trainers.data.map(trainer => {
      return { ...trainer, label: `${trainer.name} ${trainer.surname}` };
    });
  },
  async created() {
    this.currentId = this.$route.params.id;
    if (this.currentId) {
      this.getAttendances({ id: this.currentId });
      const students = await this.$store.dispatch("auth/request", {
        method: "get",
        url: "students"
      });
      this.$store
        .dispatch("auth/request", {
          method: "get",
          url: `students/${this.currentId}`
        })
        .then(res => {
          this.currentStudent = res.data[0];
        });
    }
  },
  computed: {
    numberOfPresences() {
      return this.attendance.filter(presence => presence.status === 2).length;
    },
    filteredStudents() {
      if (this.selectedTrainer > 0) {
        return this.students.filter(
          ({ training_groups_trainer_id }) =>
            training_groups_trainer_id === this.selectedTrainer
        );
      }
      return this.students;
    }
  },
  data() {
    return {
      attendance: [],
      students: [],
      trainers: [],
      currentId: null,
      currentStudent: null,
      selectedTrainer: -1
    };
  },
  methods: {
    async getAttendances(user) {
      const presences = await this.$store.dispatch("auth/request", {
        method: "get",
        url: `presences/${user.id}`
      });
      this.attendance = presences.data;
    },
    selectTrainer(trainer) {
      this.selectedTrainer = trainer.id;
    }
  }
};
</script>
<style lang="scss" scoped>
.year__ul {
  list-style-type: none;
  padding: 0;
}
.year__li {
  text-transform: uppercase;
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
  text-transform: uppercase;
}
.search-box {
  display: flex;
  justify-content: center;
  align-items: center;
}
.autocomplete-box {
  display: flex;
  align-items: center;
  width: 35rem;
  gap: 2rem;
  margin-left: 0.25rem;
}
</style>
