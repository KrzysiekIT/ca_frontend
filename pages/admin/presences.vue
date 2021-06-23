<template>
  <div>
    <div class="search-box">
      {{$t('general.student')}}:
      <div class="autocomplete-box">
        <autocomplete
          :items="students"
          type="multiple"
          @set="getAttendances($event)"
        />
      </div>
    </div>
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
  },
  computed: {
    numberOfPresences() {
      return this.attendance.filter(presence => presence.status === 2).length;
    }
  },
  data() {
    return {
      attendance: [],
      students: []
    };
  },
  methods: {
    async getAttendances(user) {
      const presences = await this.$store.dispatch("auth/request", {
        method: "get",
        url: `presences/${user.id}`
      });
      this.attendance = presences.data;
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
  width: 10rem;
  margin-left: 0.25rem;
}
</style>
