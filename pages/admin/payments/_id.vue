<template>
  <div class="users" v-if="users">
    {{ $t("general.show_months") }} {{ $t("general.from") }}
    <input type="number" class="payments__input" v-model="monthInterval.from" />
    {{ $t("general.to") }}
    <input type="number" v-model="monthInterval.to" class="payments__input" />
    <client-only>
      <data-table
        :fields="fieldsWithMonths"
        :selectOptions="selectOptions"
        :data="users"
        :apiUrl="apiUrl"
      />
    </client-only>
  </div>
</template>
<script>
export default {
  computed: {
    fieldsWithMonths() {
      const toAdd = [];
      if (process.client) {
        for (
          let paymentsIndex = +this.monthInterval.from;
          paymentsIndex < +this.monthInterval.to + 1;
          paymentsIndex++
        ) {
          const newField = {};
          newField[`m${paymentsIndex}`] = "";
          newField.name = `m${paymentsIndex}`;
          newField.label = `m${paymentsIndex}`;
          newField.filter = { active: false, value: "", selected: false };
          newField.component = "payment";
          newField.options = { field: [`m${paymentsIndex}`] };
          toAdd.push(newField);
        }
      }
      let newFields = [...this.fields, ...toAdd];
      return newFields;
    }
  },
  data() {
    return {
      payments: [],
      monthInterval: {
        from: 1,
        to: 4
      },
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
          component: "no-editable",
          options: { field: ["name"] }
        },
        {
          name: "surname",
          label: this.$t("general.surname"),
          filter: { active: true, value: "", selected: false },
          component: "no-editable",
          options: { field: ["surname"] }
        },
        {
          name: "birthYear",
          label: this.$t("settings.birth_year"),
          filter: { active: false, value: "", selected: false },
          component: "no-editable",
          options: { field: ["birthYear"] }
        },
        {
          name: "parentFullName",
          label: this.$t("general.parent_full_name"),
          filter: { active: true, value: "", selected: false },
          component: "no-editable",
          options: { field: ["parent", "fullName"] }
        },
        {
          name: "parentEmail",
          label: this.$t("general.parent_email"),
          filter: { active: true, value: "", selected: false },
          component: "no-editable",
          options: { field: ["parent", "email"] }
        },
        {
          name: "parentPhoneNumber",
          label: this.$t("general.parent_phone"),
          filter: { active: false, value: "", selected: false },
          component: "no-editable",
          options: { field: ["parent", "phoneNumber"] }
        }
      ],
      users: null,
      monthlyPayments: (() => {
        const payments = {};
        for (let paymentsIndex = 1; paymentsIndex < 49; paymentsIndex++) {
          payments[`m${paymentsIndex}`] = "";
        }
        return payments;
      })()
    };
  },
  async fetch() {
    const payments = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `payments`
    });
    this.payments = payments.data;
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

    let frontendStudents = backendStudents.map(
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
          linkSent: link_sent ?? "",
          m3: 100
        };
      }
    );

    const mappedFrontendStudents = frontendStudents.map(el => el.id);

    this.payments.forEach(payment => {
      const studentIndex = mappedFrontendStudents.indexOf(payment.user_id);
      frontendStudents[studentIndex][`m${payment.order_number}`] =
        payment.amount;
    });

    if (this.$route.params.id) {
      frontendStudents = frontendStudents.filter((user) => user.id === + this.$route.params.id);
    }

    this.users = frontendStudents;
  }
};
</script>
<style lang="scss" scoped>
.payments__input {
  width: 2.6rem;
}
</style>
