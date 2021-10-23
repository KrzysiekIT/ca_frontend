<template>
  <div>
    <div class="trainers" v-if="trainers" ref="trainers-table">
      <div class="users_buttons">
        <data-header
          :baseTable="trainers"
          :models="models"
          :apiUrl="apiUrl"
          :label="$t('general.add_trainer')"
          @new-added="$fetch()"
        />
        <button
          @click="downloadTable('trainers')"
          class="users__add__button add__button add__button--default"
        >
          {{ $t("general.download_excel") }}
        </button>
      </div>
      <data-table
        :fields="fields"
        :selectOptions="selectOptions"
        :data="trainers"
        :apiUrl="apiUrl"
        @changed="$fetch()"
        :id="'trainers'"
      />
    </div>
    <div class="groups"><group-info :trainers="groupTrainers" /></div>
  </div>
</template>
<script>
export default {
  computed: {
    groupTrainers: function() {
      if (this.trainers) {
        return this.trainers;
      }
      return [];
    }
  },
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
  methods: {
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
    frontendStudents.reverse();
    this.trainers = frontendStudents;
  }
};
</script>
<style lang="scss" scoped>
.groups {
  margin-top: 5rem;
}
.users_buttons {
  display: flex;
  align-items: center;
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
