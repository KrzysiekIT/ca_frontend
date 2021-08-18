<template>
  <div>
    <div class="trainers" v-if="trainers">
      <data-header
        :baseTable="trainers"
        :models="models"
        :apiUrl="apiUrl"
        :label="$t('general.add_trainer')"
      />
      <data-table
        :fields="fields"
        :selectOptions="selectOptions"
        :data="trainers"
        :apiUrl="apiUrl"
      />
    </div>
    <div class="groups"><group-info /></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      apiUrl: "trainers",
      selectOptions: {
        statuses: [
          { value: 4, label: "Blokada" },
          { value: 3, label: "Nieaktywny" },
          { value: 2, label: "Pauza" },
          { value: 1, label: "Aktywny" }
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
        ],
        roles: [
          { value: 1, label: "superadmin" },
          { value: 2, label: "admin" },
          { value: 3, label: "trener" }
        ]
      },
      models: {
        frontend: {
          id: 0,
          status: 1,
          startAt: "2017-12-01T20:00:00.000Z",
          name: "",
          surname: "",
          roleId: 3,
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
        backend: {
          role_id: 3
        }
      },
      fields: [
        {
          name: "name",
          label: this.$t("general.name"),
          filter: { active: true, value: "", selected: false },
          component: "editable",
          options: { field: ["name"] }
        },
        {
          name: "surname",
          label: this.$t("general.surname"),
          filter: { active: true, value: "", selected: false },
          component: "editable",
          options: { field: ["surname"] }
        },
        {
          name: "email",
          label: this.$t("general.email_adress"),
          filter: { active: true, value: "", selected: false },
          component: "editable",
          options: { field: ["email"] }
        },
        {
          name: "phoneNumber",
          label: this.$t("general.phone_number"),
          filter: { active: true, value: "", selected: false },
          component: "editable",
          options: { field: ["phoneNumber"] }
        },
        {
          name: "role",
          label: this.$t("general.role"),
          filter: { active: true, value: "", selected: false },
          component: "select-option",
          options: {
            options: "roles",
            field: ["roleId"]
          }
        }
      ],
      trainers: null
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
    let [backendStudents, groups] = apiReponses;
    backendStudents = backendStudents.data;
    groups = groups.data;
    this.selectOptions.groups = groups.map(
      ({
        id,
        label,
        trainer_id,
        lesson_day,
        lesson_hour,
        trainers_name,
        trainers_surname
      }) => {
        return {
          id,
          value: id,
          label,
          trainerId: trainer_id,
          lessonDay: this.selectOptions.days.find(
            day => lesson_day === day.value
          ).label,
          lessonHour: lesson_hour,
          trainerLabel: `${trainers_name} ${trainers_surname}`
        };
      }
    );

    const frontendStudents = backendStudents.map(
      ({
        id,
        name,
        surname,
        birth_year,
        parent_full_name,
        parent_email,
        parent_phone_number,
        status,
        start_at,
        group_id,
        link_sent,
        email,
        phone_number,
        role_id
      }) => {
        return {
          id: id,
          status: status ?? 0,
          startAt: start_at ?? "",
          name: name ?? "",
          surname: surname ?? "",
          birthYear: birth_year ?? "",
          parent: {
            fullName: parent_full_name ?? "",
            email: parent_email ?? "",
            phoneNumber: parent_phone_number ?? ""
          },
          group: this.selectOptions.groups.find(({ id }) => id === group_id),
          linkSent: link_sent ?? "",
          email,
          phoneNumber: phone_number,
          roleId: role_id
        };
      }
    );
    this.trainers = frontendStudents;
  }
};
</script>
<style lang="scss" scoped>
.groups {
  margin-top: 5rem;
}
</style>
