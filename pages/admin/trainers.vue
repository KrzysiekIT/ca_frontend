<template>
  <div class="groups" v-if="groups">
    <data-header
      :baseTable="groups"
      :models="models"
      :apiUrl="apiUrl"
      label="Dodaj grupę"
    />
    <data-table
      :fields="fields"
      :selectOptions="selectOptions"
      :data="groups"
      :apiUrl="apiUrl"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      apiUrl: "groups",
      models: {
        frontend: {
          id: 0,
          status: 1,
          startAt: "2017-12-01T20:00:00.000Z",
          name: "",
          surname: "",
          parent: {
            fullName: "",
            email: "",
            phoneNumber: ""
          },
          group: {
            id: 1,
            value: 1,
            label: "",
            trainerId: 3,
            lessonDay: "",
            lessonHour: "",
            trainerLabel: ""
          },
          linkSent: 1
        },
        backend: {}
      },
      selectOptions: {
        level: [
          { value: 3, label: "Starsza" },
          { value: 2, label: "Średnia" },
          { value: 1, label: "Młoda" }
        ],
        groups: [],
        days: [
          { value: 1, label: "poniedziałek" },
          { value: 2, label: "wtorek" },
          { value: 3, label: "środa" },
          { value: 4, label: "czwartek" },
          { value: 5, label: "piątek" },
          { value: 6, label: "sobota" },
          { value: 7, label: "niedziela" }
        ]
      },
      fields: [
        {
          name: "level",
          label: "Rodzaj grupy",
          filter: { active: true, value: "", selected: false },
          component: "select-option",
          options: {
            options: "level",
            field: ["level"],
            base: "group"
          }
        }
      ],
      groups: null
    };
  },
  async fetch() {
    const toFetch = [
      this.$store.dispatch("auth/request", {
        method: "get",
        url: "students"
      }),
      this.$store.dispatch("auth/request", {
        method: "get",
        url: "groups"
      })
    ];
    const apiReponses = await Promise.all(toFetch);
    let [backendStudents, groups] = apiReponses;
    groups = groups.data;

    const frontendGroups = groups.map(
      ({ id, level, label, trainer_id, lesson_day, lesosn_hour, lesson_link }) => {
        return {
          id: id,
          level: level ?? 1,
          label: label ?? "",
          trainerId: trainer_id ?? 3,
          lessonDay: lesson_day ?? "",
          lesosnHour: lesosn_hour ?? "",
          lessonLink: lesson_link ?? ""
        };
      }
    );
    this.groups = frontendGroups;
  }
};
</script>
<style lang="scss" scoped>
.groups {
  max-height: 0;
}
</style>
