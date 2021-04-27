<template>
  <div class="users">
    <data-header :baseTable="users" :models="models" />
    <data-table :fields="fields" :selectOptions="selectOptions" :data="users" />
  </div>
</template>
<script>
export default {
  components: {
    LinkButton: () => import("@/components/table/LinkButton.vue"),
    ActionButton: () => import("@/components/table/ActionButton.vue"),
    SelectOption: () => import("@/components/table/SelectOption.vue"),
    CalendarPicker: () => import("@/components/table/CalendarPicker.vue"),
    Editable: () => import("@/components/table/Editable.vue"),
    NoEditable: () => import("@/components/table/NoEditable.vue")
  },
  computed: {
    filters() {
      return this.fields
        .filter(({ filter }) => filter.active && filter.value)
        .map(({ filter, options, component }) => {
          return {
            field: options.field,
            options: options.options,
            value: filter.value,
            component,
            selected: filter.selected
          };
        });
    },
    filteredUsers() {
      const { filters, users, getDeepValue } = this;
      let newUsers = users;
      const filtersLength = this.filters.length;
      let filterIndex = 0;
      for (filterIndex; filterIndex < filtersLength; filterIndex++) {
        newUsers = newUsers.filter(user => {
          if (!user.id) {
            return false;
          }
          let deepValue;
          deepValue = getDeepValue(user, filters[filterIndex]["field"]);
          if (
            filters[filterIndex]["component"] === "select-option" &&
            !filters[filterIndex]["selected"]
          ) {
            deepValue = this.selectOptions[
              filters[filterIndex]["options"]
            ].find(option => option.value === deepValue).label;
          } else if (filters[filterIndex]["selected"]) {
            deepValue = this.selectOptions[
              filters[filterIndex]["options"]
            ].find(option => option.value === deepValue);
          }
          if (filters[filterIndex]["selected"]) {
            const stay =
              deepValue.value ===
              this.selectOptions[filters[filterIndex]["options"]].find(
                option => option.value === filters[filterIndex].value.value
              ).value;
            return stay;
          } else {
            deepValue = deepValue;
            return deepValue
              .toLowerCase()
              .trim()
              .includes(filters[filterIndex]["value"].toLowerCase().trim());
          }
        });
      }
      return newUsers;
    }
  },
  data() {
    return {
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
          label: "Imię",
          filter: { active: true, value: "", selected: false },
          component: "editable",
          options: { field: ["name"] }
        },
        {
          name: "surname",
          label: "Nazwisko",
          filter: { active: true, value: "", selected: false },
          component: "editable",
          options: { field: ["surname"] }
        },
        {
          name: "birthYear",
          label: "Rok urodzenia",
          filter: { active: false, value: "", selected: false },
          component: "editable",
          options: { field: ["birthYear"] }
        },
        {
          name: "parentFullName",
          label: "Imię i nazwisko rodzica",
          filter: { active: true, value: "", selected: false },
          component: "editable",
          options: { field: ["parent", "fullName"] }
        },
        {
          name: "parentEmail",
          label: "Adres e-mail rodzica",
          filter: { active: true, value: "", selected: false },
          component: "editable",
          options: { field: ["parent", "email"] }
        },
        {
          name: "parentPhoneNumber",
          label: "Telefon rodzica",
          filter: { active: false, value: "", selected: false },
          component: "editable",
          options: { field: ["parent", "phoneNumber"] }
        },
        {
          name: "groupId",
          label: "Grupa",
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
          label: "Trener",
          filter: { active: true, value: "", selected: false },
          component: "no-editable",
          options: {
            field: ["group", "trainerLabel"]
          }
        },
        {
          name: "groupDay",
          label: "Dzień zajęć",
          filter: { active: true, value: "", selected: false },
          component: "editable",
          options: {
            field: ["group", "lessonDay"]
          }
        },
        {
          name: "groupHour",
          label: "Godzina zajęć",
          filter: { active: true, value: "" },
          component: "editable",
          options: {
            field: ["group", "lessonHour"]
          }
        },
        {
          name: "presences",
          label: "Obecności",
          filter: { active: false, value: "", selected: false },
          component: "link-button",
          options: { to: "presences/", field: ["id"] }
        },
        {
          name: "payments",
          label: "Płatności",
          filter: { active: false, value: "", selected: false },
          component: "link-button",
          options: { to: "payments/", field: ["id"] }
        },
        {
          name: "status",
          label: "Status ucznia",
          filter: { active: false, value: "", selected: false },
          component: "select-option",
          options: {
            options: "statuses",
            field: ["status"]
          }
        },
        {
          name: "date",
          label: "Data rozpoczęcia",
          filter: { active: false, value: "", selected: false },
          component: "calendar-picker",
          options: {
            field: ["startAt"]
          }
        },
        {
          name: "linkSent",
          label: "Link wysłany",
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
          label: "Usuń",
          filter: { active: false, value: "" },
          component: "action-button",
          options: {
            action: "remove",
            field: ["id"],
            toExecute: "remove",
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
<style lang="scss" scoped>
.users {
  max-height: 0;
}
.users__header {
  padding-bottom: 1rem;
}
.users__table {
  border: solid 2px $white;
  border-collapse: collapse;
  min-width: 100%;
  overflow: scroll;
}
.user__table-row--hightligted {
  background-color: lighten($mainBackground, 10);
}
.users__table-td {
  border: solid 2px $white;
  padding: 0.5rem;
  text-align: center;
  min-width: 6rem;
}
.users__table-th {
  border: solid 2px $white;
  padding: 0.5rem;
}
</style>
