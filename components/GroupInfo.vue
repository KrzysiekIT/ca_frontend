<template>
  <div class="groups" v-if="groups">
    <div class="page--middle-header">{{ $t("general.groups") }}</div>
    <div class="users_buttons">
      <data-header
        :baseTable="groups"
        :models="models"
        :apiUrl="apiUrl"
        :label="$t('general.add_group')"
      />
      <button
        @click="downloadTable('groups')"
        class="users__add__button add__button add__button--default"
      >
        {{ $t("general.download_excel") }}
      </button>
    </div>
    <data-table
      :fields="fields"
      :selectOptions="selectOptions"
      :data="groups"
      :apiUrl="apiUrl"
      :id="'groups'"
    />
  </div>
</template>
<script>
export default {
  watch: {
    trainers(newVal) {
      this.selectOptions.trainers = newVal.map(({ id, name, surname }) => {
        return {
          id,
          value: id,
          label: `${name} ${surname}`
        };
      });
    }
  },
  props: {
    trainers: {
      type: Array,
      required: true
    }
  },
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
        ],
        hours: (() => {
          const hours = Array.from(Array(24).keys());
          const minutes = ["00", "15", "30", "45"];
          const options = [];
          let hourIndex = 0;
          const hoursLength = hours.length;
          const minutesLength = minutes.length;
          for (hourIndex; hourIndex < hoursLength; hourIndex++) {
            let minuteIndex = 0;
            for (minuteIndex; minuteIndex < minutesLength; minuteIndex++) {
              const hourToPush = `${hours[hourIndex]}:${minutes[minuteIndex]}`;
              options.push({ value: hourToPush, label: hourToPush });
            }
          }
          return options;
        })()
      },
      fields: [
        /* {
          name: "name",
          label: this.$t("general.group_name"),
          filter: { active: true, value: "", selected: false },
          component: "editable",
          options: { field: ["label"] }
        }, */
        {
          name: "level",
          label: this.$t("general.kind"),
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
          label: this.$t("general.trainer"),
          filter: { active: true, value: "", selected: false },
          component: "select-option",
          options: {
            options: "trainers",
            field: ["trainerId"]
          }
        },
        {
          name: "lessonDay",
          label: this.$t("general.lesson_day"),
          filter: { active: true, value: "", selected: false },
          component: "select-option",
          options: {
            options: "days",
            field: ["lessonDay"]
          }
        },
        {
          name: "lessonHour",
          label: this.$t("general.lesson_hour"),
          filter: { active: true, value: "", selected: false },
          component: "select-option",
          options: {
            options: "hours",
            field: ["lessonHour"]
          }
        },
        {
          name: "lessonLink",
          label: "Link",
          filter: { active: false, value: "", selected: false },
          component: "editable",
          options: {
            field: ["lessonLink"]
          }
        },
        {
          name: "lessonTool",
          label: this.$t("general.tool"),
          filter: { active: false, value: "", selected: false },
          component: "editable",
          options: {
            field: ["lessonTool"]
          }
        },
        {
          name: "removeUser",
          label: this.$t("general.remove"),
          filter: { active: false, value: "" },
          component: "action-button",
          options: {
            action: "remove",
            field: ["id"],
            toExecute: "remove",
            link: "groups",
            activeState: 1,
            states: {
              active: {
                disabled: false,
                icon: "users-slash",
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
                icon: "users-slash",
                classModifier: "remove",
                animation: false
              }
            },
            newValue: null
          }
        }
      ],
      groups: []
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
            if (cols[j].firstChild.selectedOptions[0]) {
              textContent = cols[j].firstChild.selectedOptions[0].innerText;
            } else {
              textContent = "";
            }
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
        lesson_hour,
        lesson_tool,
        lesson_link
      }) => {
        return {
          id: id,
          level: level ?? 1,
          label: label ?? "",
          trainerId: trainer_id ?? 3,
          lessonDay: lesson_day ?? "",
          lessonHour: lesson_hour ?? "",
          lessonLink: lesson_link ?? "",
          lessonTool: lesson_tool ?? ""
        };
      }
    );
    this.groups = frontendGroups;
  }
};
</script>
<style lang="scss" scoped>
.page--middle-header {
  font-size: 2rem;
  padding-bottom: 2rem;
  display: flex;
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
