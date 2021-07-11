<template>
  <div class="groups" v-if="groups">
    <data-header
      :baseTable="groups"
      :models="models"
      :apiUrl="apiUrl"
      :label="$t('general.add_group')"
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
        {
          name: "name",
          label: this.$t("general.group_name"),
          filter: { active: true, value: "", selected: false },
          component: "editable",
          options: { field: ["label"] }
        },
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
<style lang="scss" scoped></style>
