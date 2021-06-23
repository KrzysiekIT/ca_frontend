<template>
  <div class="users" v-if="users">
    <data-header
      :baseTable="users"
      :models="models"
      :apiUrl="apiUrl"
      :label="$t('general.add_student')"
    />
    <data-table
      :fields="fields"
      :selectOptions="selectOptions"
      :data="users"
      :apiUrl="apiUrl"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      apiUrl: "students",
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
        ]
      },
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
        backend: {
          role_id: 4
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
          name: "birthYear",
          label: this.$t("settings.birth_year"),
          filter: { active: false, value: "", selected: false },
          component: "editable",
          options: { field: ["birthYear"] }
        },
        {
          name: "parentFullName",
          label: this.$t("general.parent_full_name"),
          filter: { active: true, value: "", selected: false },
          component: "editable",
          options: { field: ["parent", "fullName"] }
        },
        {
          name: "parentEmail",
          label: this.$t("general.parent_email"),
          filter: { active: true, value: "", selected: false },
          component: "editable",
          options: { field: ["parent", "email"] }
        },
        {
          name: "parentPhoneNumber",
          label: this.$t("general.parent_phone"),
          filter: { active: false, value: "", selected: false },
          component: "editable",
          options: { field: ["parent", "phoneNumber"] }
        },
        {
          name: "groupId",
          label: this.$t("general.group"),
          filter: { active: true, value: "", selected: false },
          component: "select-option",
          options: {
            options: "groups",
            field: ["group", "id"],
            base: "group"
          }
        },
        {
          name: "trainerLabel",
          label: this.$t("general.trainer"),
          filter: { active: true, value: "", selected: false },
          component: "no-editable",
          options: {
            field: ["group", "trainerLabel"]
          }
        },
        {
          name: "groupDay",
          label: this.$t('general.lesson_day'),
          filter: { active: true, value: "", selected: false },
          component: "no-editable",
          options: {
            field: ["group", "lessonDay"]
          }
        },
        {
          name: "groupHour",
          label: this.$t('general.lesson_hour'),
          filter: { active: true, value: "" },
          component: "no-editable",
          options: {
            field: ["group", "lessonHour"]
          }
        },
        {
          name: "presences",
          label: this.$t('general.presences'),
          filter: { active: false, value: "", selected: false },
          component: "link-button",
          options: { to: "presences/", field: ["id"] }
        },
        {
          name: "payments",
          label: this.$t('general.payments'),
          filter: { active: false, value: "", selected: false },
          component: "link-button",
          options: { to: "payments/", field: ["id"] }
        },
        {
          name: "status",
          label: this.$t('general.student_status'),
          filter: { active: false, value: "", selected: false },
          component: "select-option",
          options: {
            options: "statuses",
            field: ["status"]
          }
        },
        {
          name: "date",
          label: this.$t('general.start_date'),
          filter: { active: false, value: "", selected: false },
          component: "calendar-picker",
          options: {
            field: ["startAt"]
          }
        },
        {
          name: "linkSent",
          label: this.$t('general.link_sent'),
          filter: { active: false, value: "" },
          component: "action-button",
          options: {
            action: "changeValue",
            field: ["linkSent"],
            toExecute: "sendEmail",
            activeState: 0,
            states: {
              active: {
                disabled: false,
                icon: "paper-plane",
                classModifier: "active",
                animation: false
              },
              loading: {
                disabled: true,
                icon: "spinner",
                classModifier: "loading",
                animation: true
              },
              disabled: {
                disabled: true,
                icon: "check",
                classModifier: "success",
                animation: false
              }
            },
            newValue: 1
          }
        },
        {
          name: "linkSent",
          label: this.$t('general.remove'),
          filter: { active: false, value: "" },
          component: "action-button",
          options: {
            action: "remove",
            field: ["id"],
            toExecute: "remove",
            link: "users",
            activeState: 1,
            states: {
              active: {
                disabled: false,
                icon: "user-minus",
                classModifier: "remove",
                animation: false
              },
              loading: {
                disabled: true,
                icon: "spinner",
                classModifier: "loading",
                animation: true
              },
              disabled: {
                disabled: false,
                icon: "user-minus",
                classModifier: "remove",
                animation: false
              }
            },
            newValue: null
          }
        }
      ],
      users: null
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
        link_sent
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
          linkSent: link_sent ?? ""
        };
      }
    );
    this.users = frontendStudents;
  }
};
</script>
<style lang="scss" scoped></style>
