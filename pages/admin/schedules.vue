<template>
  <div class="users" v-if="users">
    <div class="users_buttons">
      <button
        @click="resetFilters"
        class="users__button-clear button-clear button-clear--default"
      >
        {{ $t("general.reset_filters") }}
      </button>
    </div>
    <data-table
      :fields="fields"
      :selectOptions="selectOptions"
      :data="usersWithEmptyGroups"
      :apiUrl="apiUrl"
      :refresh="refresh"
      :showNumbers="true"
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
  computed: {
    usersWithEmptyGroups() {
      const maxStudentsInGroup = 7;
      const usersWithEmpty = JSON.parse(JSON.stringify(this.users));
      const allUsersGroups = this.users.map(user => user.group.id);
      const groupIds = [...new Set(allUsersGroups)];
      groupIds.forEach(groupId => {
        const numberOfUsers = allUsersGroups.filter(id => id === groupId)
          .length;
        if (numberOfUsers < maxStudentsInGroup) {
          const userIndex = allUsersGroups.indexOf(groupId);
          const newUsersNumber = maxStudentsInGroup - numberOfUsers;
          for (let i = 0; i < newUsersNumber; i++) {
            const newUser = JSON.parse(JSON.stringify(this.users[userIndex]));
            newUser.fullName = this.$t('general.empty')
            newUser.birthYear = "";
            usersWithEmpty.push(newUser);
          }
        }
      });
      return usersWithEmpty;
    }
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
          role_id: 4,
          start_at: "2017-12-01 20:00:00"
        }
      },
      fields: [
        {
          name: "fullName",
          label: this.$t("general.name_and_surname"),
          filter: { active: true, value: "", selected: false },
          component: "no-editable",
          options: { field: ["fullName"] }
        },
        {
          name: "birthYear",
          label: this.$t("settings.birth_year"),
          filter: { active: true, value: "", selected: false },
          component: "no-editable",
          options: { field: ["birthYear"] }
        },
        {
          name: "groupLevel",
          label: this.$t("general.type_of_group"),
          filter: { active: true, value: "", selected: false },
          component: "no-editable",
          options: {
            field: ["group", "level"]
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
          label: this.$t("general.lesson_day"),
          filter: { active: true, value: "", selected: false },
          component: "no-editable",
          options: {
            field: ["group", "lessonDay"]
          }
        },
        {
          name: "groupHour",
          label: this.$t("general.lesson_hour"),
          filter: { active: true, value: "" },
          component: "no-editable",
          options: {
            field: ["group", "lessonHour"]
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
    const groupLevels = {
      1: "starsza",
      2: "średnia",
      3: "młodsza"
    };
    this.selectOptions.groups = groups.map(
      ({
        id,
        label,
        level,
        trainer_id,
        lesson_day,
        lesson_hour,
        trainers_name,
        trainers_surname
      }) => {
        return {
          id,
          level: groupLevels[level],
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
          fullName: `${name} ${surname}` ?? "",
          birthYear: birth_year ? birth_year + "" : "",
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
</style>
