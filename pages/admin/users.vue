<template>
  <div class="users">
    <header class="users__header">
      <button
        class="users__button users__button--default"
        @click="addUser(userBackendModel)"
      >
        Dodaj ucznia
      </button>
    </header>
    <table class="users__table" v-if="filteredUsers">
      <thead>
        <tr>
          <th
            v-for="({ label }, index) in fields"
            :key="'th' + index"
            class="users__table-th"
          >
            {{ label }}
          </th>
        </tr>
        <tr>
          <th
            v-for="({ filter, options, component }, index) in fields"
            :key="'filter' + index"
            class="users__table-th"
          >
            <autocomplete
              :items="
                component === 'select-option'
                  ? options.options
                  : Array.from(
                      new Set(
                        filteredUsers.map(user => {
                          return getDeepValue(user, options['field']);
                        })
                      )
                    )
              "
              :type="component === 'select-option' ? 'multiple' : ''"
              @set="setFilterValue(filter, 'set', $event, component)"
              @input="setFilterValue(filter, 'input', $event, component)"
              v-if="filter.active"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(user, userIndex) in filteredUsers"
          :key="'user' + user.id"
          @click="highlight(userIndex)"
          class="user__table-row"
          :class="
            highlighted === userIndex ? 'user__table-row--hightligted' : ''
          "
        >
          <td
            v-for="(row, fieldIndex) in fields"
            :key="'td' + fieldIndex"
            class="users__table-td"
          >
            <component
              :is="row.component"
              :options="row.options"
              :info="user"
              :row="userIndex"
              @action="handleAction"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  components: {
    LinkButton: () => import("@/components/table/LinkButton.vue"),
    ActionButton: () => import("@/components/table/ActionButton.vue"),
    SelectOption: () => import("@/components/table/SelectOption.vue"),
    CalendarPicker: () => import("@/components/table/CalendarPicker.vue"),
    Editable: () => import("@/components/table/Editable.vue")
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
          let deepValue;
          deepValue = getDeepValue(user, filters[filterIndex]["field"]);
          if (
            filters[filterIndex]["component"] === "select-option" &&
            !filters[filterIndex]["selected"]
          ) {
            deepValue = filters[filterIndex]["options"].find(
              option => option.value === deepValue
            ).label;
          } else if (filters[filterIndex]["selected"]) {
            deepValue = filters[filterIndex]["options"].find(
              option => option.value === deepValue
            );
          }
          if (filters[filterIndex]["selected"]) {
            const stay =
              deepValue.value ===
              filters[filterIndex].options.find(
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
      testUsers: null,
      highlighted: null,
      userBackendModel: {
        role_id: 4
      },
      userFrontendModel: {
        id: 0,
        status: 0,
        startAt: "",
        name: "",
        surname: "",
        birthYear: "",
        parent: {
          fullName: "",
          email: "",
          phoneNumber: ""
        },
        group: {
          id: 0,
          trainerId: 0,
          day: "",
          hour: ""
        },
        lindSend: ""
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
            options: [
              { value: 2, label: "pt. 11:15" },
              { value: 1, label: "cz. 18:00" }
            ],
            field: ["group", "id"]
          }
        },
        {
          name: "groupTrainerId",
          label: "Trener",
          filter: { active: true, value: "", selected: false },
          component: "editable",
          options: {
            field: ["group", "trainerId"]
          }
          /* component: "select-option",
          options: {
            options: [
              { value: 5, label: "Galik Anonimik" },
              { value: 4, label: "Jan Nowak" },
              { value: 3, label: "Michał Anioł" },
              { value: 2, label: "Lech Kowalski" },
              { value: 1, label: "Marek Dzięcioł" }
            ],
            field: ["trainerId"]
          } */
        },
        {
          name: "groupDay",
          label: "Dzień zajęć",
          filter: { active: true, value: "", selected: false },
          component: "editable",
          options: {
            field: ["group", "day"]
          }
          /* component: "select-option",
          options: {
            options: [
              { value: 1, label: "poniedziałek" },
              { value: 2, label: "wtorek" },
              { value: 3, label: "środa" },
              { value: 4, label: "czwartek" },
              { value: 5, label: "piątek" },
              { value: 6, label: "sobota" },
              { value: 7, label: "niedziela" }
            ],
            field: ["day"]
          } */
        },
        {
          name: "groupHour",
          label: "Godzina zajęć",
          filter: { active: true, value: "" },
          component: "editable",
          options: {
            field: ["group", "hour"]
          }
          /* component: "select-option",
          options: {
            options: [
              { value: "00:00", label: "00:00" },
              { value: "05:00", label: "05:00" },
              { value: "18:00", label: "18:00" },
              { value: "19:00", label: "19:00" },
              { value: "21:00", label: "21:00" },
              { value: "22:00", label: "22:00" },
              { value: "23:00", label: "23:00" }
            ],
            field: ["hour"]
          } */
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
            options: [
              { value: 4, label: "Blokada" },
              { value: 3, label: "Nieaktywny" },
              { value: 2, label: "Pauza" },
              { value: 1, label: "Aktywny" }
            ],
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
          name: "linkSend",
          label: "Link wysłany",
          filter: { active: false, value: "" },
          component: "action-button",
          options: {
            field: ["linkSend"]
            /* toExecute: function() {
            }, */
          }
        }
      ],
      users: null
    };
  },
  methods: {
    async addUser(userBackendModel) {
      const newUserId = (
        await this.$store.dispatch("auth/request", {
          method: "post",
          url: "students",
          data: { values: userBackendModel }
        })
      ).data[1].id;
      const newUser = JSON.parse(JSON.stringify(this.userFrontendModel));
      newUser.id = newUserId;
      this.users.unshift(newUser);
    },
    async patchUser(userId, change) {
      await this.$store.dispatch("auth/request", {
        method: "patch",
        url: `students/${userId}`,
        data: { newValues: change }
      });
    },
    setFilterValue(filter, action, value, component) {
      if (action === "set" && component === "select-option") {
        filter.selected = true;
      } else {
        filter.selected = false;
      }
      filter["value"] = value;
    },
    getDeepValue(sourceObject, fields) {
      let value = sourceObject;
      const fieldsLength = fields.length;
      let fieldIndex = 0;
      for (fieldIndex; fieldIndex < fieldsLength; fieldIndex++) {
        value = value[fields[fieldIndex]];
      }
      return value;
    },
    mapFields(fields) {
      const joinedFields = fields.join("_");
      const mappedField = joinedFields
        .split(/(?=[A-Z])/)
        .join("_")
        .toLowerCase();
      return mappedField;
    },
    async changeDeepValue(sourceObject, fields, newValue) {
      let value = sourceObject;
      const userId = sourceObject.id;
      const fieldsLength = fields.length;
      let fieldIndex = 0;
      for (fieldIndex; fieldIndex < fieldsLength; fieldIndex++) {
        if (fieldIndex === fieldsLength - 1) {
          await this.patchUser(userId, { [this.mapFields(fields)]: newValue });
          value[fields[fieldIndex]] = newValue;
        } else {
          /* await this.patchUser(userId, {
            [this.mapFields(fields)]: value[fields[fieldIndex]]
          }); */
          value = value[fields[fieldIndex]];
        }
      }
    },
    highlight(rowIndex) {
      this.highlighted = rowIndex;
      //this.highlighted = this.highlighted === rowIndex ? null : rowIndex;
    },
    handleAction(details) {
      const actions = {
        changeValue: options => {
          this.changeDeepValue(
            this.users[options.row],
            options.field,
            options.value
          );
        }
      };
      actions[details.name](details);
    }
  },
  async fetch() {
    const backendStudents = (
      await this.$store.dispatch("auth/request", {
        method: "get",
        url: "students"
      })
    ).data;
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
        groups_trainer_id,
        groups_lesson_day,
        groups_lesson_hour,
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
          group: {
            id: group_id ?? 0,
            trainerId: groups_trainer_id ?? 0,
            day: groups_lesson_day ?? 0,
            hour: groups_lesson_hour ?? 0
          },
          lindSend: link_sent ?? ""
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
.users__button {
  border: none;
  border-radius: $appRadius;
  color: $white;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 0.5rem;
  min-width: 8rem;
  outline: none;
  padding: 0.625rem;
}
.users__button:active {
  transform: scale(0.95);
}
.users__button--default {
  background-color: $resultNeutralBlue;
}
.users__button--default:hover {
  background-color: darken($resultNeutralBlue, 15%);
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
