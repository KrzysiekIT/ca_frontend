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
          level: 1,
          label: "",
          trainerId: 3,
          lessonDay: 1,
          lesosnHour: "",
          lessonLink: ""
        },
        backend: {
          label: ""
        }
      },
      selectOptions: {
        level: [
          { value: 3, label: "Starsza" },
          { value: 2, label: "Średnia" },
          { value: 1, label: "Młoda" }
        ],
        trainers: [],
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
          name: "name",
          label: "Nazwa",
          filter: { active: true, value: "", selected: false },
          component: "editable",
          options: { field: ["label"] }
        },
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
        },
        {
          name: "trainer",
          label: "Trener",
          filter: { active: true, value: "", selected: false },
          component: "select-option",
          options: {
            options: "trainers",
            field: ["trainerId"]
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
        url: "trainers"
      }),
      this.$store.dispatch("auth/request", {
        method: "get",
        url: "groups"
      })
    ];
    const apiReponses = await Promise.all(toFetch);
    let [backendTrainers, groups] = apiReponses;
    groups = groups.data;
    backendTrainers = backendTrainers.data;

    this.selectOptions.trainers = backendTrainers.map(
      ({ id, name, surname }) => {
        return {
          id,
          value: id,
          label: `${name} ${surname}`
        };
      }
    );

    const frontendGroups = groups.map(
      ({
        id,
        level,
        label,
        trainer_id,
        lesson_day,
        lesosn_hour,
        lesson_link
      }) => {
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
