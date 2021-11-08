<template>
  <div class="users" v-if="users">
    <div class="users_buttons">
      <data-header
        :baseTable="users"
        :models="models"
        :apiUrl="apiUrl"
        :label="$t('general.add_student')"
        @new-added="$fetch()"
      />
      <button
        @click="resetFilters"
        class="users__button-clear button-clear button-clear--default"
      >
        {{ $t("general.reset_filters") }}
      </button>
      <button
        @click="downloadTable('users')"
        class="users__add__button add__button add__button--default"
      >
        {{ $t("general.download_excel") }}
      </button>
    </div>
    <data-table
      :fields="fields"
      :selectOptions="selectOptions"
      :data="users"
      :apiUrl="apiUrl"
      :refresh="refresh"
      :showNumbers="true"
      :id="'users'"
    />
  </div>
</template>
<script>
export default {
  methods: {
    resetFilters() {
      this.fields.forEach(({ filter }) => {
        if (filter.active) {
          filter.value = "";
        }
      });
      this.refresh = !this.refresh;
    },
    downloadTable(table_id, separator = ",") {
      // Select rows from table_id
      let rows = document.querySelectorAll("table#" + table_id + " tr");
      // Construct csv
      let csv = [];
      for (let i = 0; i < rows.length; i++) {
        if (i === 1) {
          // skip row with search
          continue;
        }
        let row = [],
          cols = rows[i].querySelectorAll("td, th");
        for (let j = 0; j < cols.length; j++) {
          // Clean innertext to remove multiple spaces and jumpline (break csv)
          let textContent = cols[j].textContent;
          if (cols[j].firstChild.nodeName === "INPUT") {
            textContent = cols[j].firstChild.value;
          } else if (cols[j].firstChild.nodeName === "SELECT") {
            textContent = cols[j].firstChild.selectedOptions[0].innerText;
          }
          let data = textContent
            .replace(/(\r\n|\n|\r)/gm, "")
            .replace(/(\s\s)/gm, " ");
          // Escape double-quote with double-double-quote (see https://stackoverflow.com/questions/17808511/properly-escape-a-double-quote-in-csv)
          data = data.replace(/"/g, '""');
          // Push escaped string
          row.push('"' + data + '"');
        }
        csv.push(row.join(separator));
      }
      let csv_string = csv.join("\n");
      // Download it
      let filename =
        "export_" + table_id + "_" + new Date().toLocaleDateString() + ".csv";
      let link = document.createElement("a");
      link.style.display = "none";
      link.setAttribute("target", "_blank");
      link.setAttribute(
        "href",
        "data:text/csv;charset=utf-8," + encodeURIComponent(csv_string)
      );
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },
  created() {
    const tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, -1);
    this.models.frontend.startAt = localISOTime;
    this.models.backend.start_at = new Date(Date.now() - tzoffset)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
  },
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
      refresh: false,
      models: {
        frontend: {
          id: 0,
          status: 1,
          startAt: "2017-12-01T20:00:00.000Z",
          name: "",
          surname: "",
          status: 3,
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
          linkSent: 0
        },
        backend: {
          role_id: 4,
          status: 3,
          start_at: "2017-12-01 20:00:00"
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
        } /* 
        {
          name: "email",
          label: this.$t("general.email_adress"),
          filter: { active: true, value: "", selected: false },
          component: "editable",
          options: { field: ["email"] }
        }, */,
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
          options: { field: ["email"] }
        },
        {
          name: "parentPhoneNumber",
          label: this.$t("general.parent_phone"),
          filter: { active: false, value: "", selected: false },
          component: "editable",
          options: { field: ["parent", "phoneNumber"] }
        },
        /* {
          name: "groupId",
          label: this.$t("general.group"),
          filter: { active: true, value: "", selected: false },
          component: "select-option",
          options: {
            options: "groups",
            field: ["group", "id"],
            base: "group"
          }
        }, */
        {
          name: "trainerId",
          label: this.$t("general.trainer"),
          filter: { active: false, value: "", selected: false },
          component: "select-option",
          options: {
            options: "groups",
            field: ["group", "id"],
            base: "group",
            newLabelField: "trainerLabel"
          }
        },
        {
          name: "chosenDay",
          label: this.$t("general.lesson_day"),
          filter: { active: false, value: "", selected: false },
          component: "select-option",
          options: {
            options: "groups",
            field: ["group", "id"],
            base: "group",
            selectFilter: {
              optionsFields: ["trainerId"],
              infoFields: ["group", "trainerId"]
            },
            newLabelField: "lessonDay"
          }
        },
        /* {
          name: "trainerLabel",
          label: this.$t("general.trainer"),
          filter: { active: true, value: "", selected: false },
          component: "no-editable",
          options: {
            field: ["group", "trainerLabel"]
          }
        }, */
        /* {
          name: "groupDay",
          label: this.$t("general.lesson_day"),
          filter: { active: true, value: "", selected: false },
          component: "no-editable",
          options: {
            field: ["group", "lessonDay"]
          }
        }, */
        /* {
          name: "groupHour",
          label: this.$t("general.lesson_hour"),
          filter: { active: true, value: "" },
          component: "no-editable",
          options: {
            field: ["group", "lessonHour"]
          }
        }, */
        {
          name: "groupHour",
          label: this.$t("general.lesson_hour"),
          filter: { active: false, value: "", selected: false },
          component: "select-option",
          options: {
            options: "groups",
            field: ["group", "id"],
            base: "group",
            selectFilter: {
              optionsFields: ["trainerId"],
              infoFields: ["group", "trainerId"]
            },
            selectFilterSecond: {
              optionsFields: ["lessonDay"],
              infoFields: ["group", "lessonDay"]
            },
            newLabelField: "lessonHour"
          }
        },
        {
          name: "presences",
          label: this.$t("general.presences"),
          filter: { active: false, value: "", selected: false },
          component: "link-button",
          options: { to: "presences/", field: ["id"] }
        },
        {
          name: "payments",
          label: this.$t("general.payments"),
          filter: { active: false, value: "", selected: false },
          component: "link-button",
          options: { to: "payments/", field: ["id"] }
        },
        {
          name: "status",
          label: this.$t("general.student_status"),
          filter: { active: false, value: "", selected: false },
          component: "select-option",
          options: {
            options: "statuses",
            field: ["status"]
          }
        },
        {
          name: "date",
          label: this.$t("general.start_date"),
          filter: { active: false, value: "", selected: false },
          component: "calendar-picker",
          options: {
            field: ["startAt"]
          }
        },
        {
          name: "linkSent",
          label: this.$t("general.link_sent"),
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
        }
        /* {
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
        } */
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
        email,
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
          email: email ?? "",
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
    frontendStudents.reverse();
    this.users = frontendStudents;
  }
};
</script>
<style lang="scss" scoped>
.users_buttons {
  display: flex;
  align-items: center;
}
.users__button-clear {
  margin-bottom: 1rem;
  text-align: center;
}
.button-clear {
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
.button-clear:active {
  transform: scale(0.95);
}
.button-clear--default {
  background-color: $red;
}
.button-clear--default:hover {
  background-color: darken($red, 15%);
}
.add__button {
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
.add__button:active {
  transform: scale(0.95);
}
.add__button--default {
  background-color: $resultNeutralBlue;
}
.add__button--default:hover {
  background-color: darken($resultNeutralBlue, 15%);
}
.users__add__button {
  margin-bottom: 1rem;
  text-align: center;
  margin-left: 2rem;
}
</style>
