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
    <div class="payments-data">
      <label>
        <div>{{ $t("general.payments_data") }}</div>
        <p class="payments-area">
          {{ paymentsInfo }}
        </p>
      </label>
    </div>
  </div>
</template>
<script>
import user from "~/mixins/user.js";
export default {
  mixins: [user],
  methods: {
    padZeros(number, length) {
      let my_string = "" + number;
      while (my_string.length < length) {
        my_string = "0" + my_string;
      }
      return my_string;
    },
    preparePaymentDate(startDate, paymentOrder) {
      startDate = startDate.substring(0, 7);
      const monthNumber = +startDate.substring(5, 8);
      const yearNumber = +startDate.substring(0, 4);
      const newMonthNumber = ((monthNumber + (paymentOrder - 1)) % 12) + 1;
      const yearsToAdd = ~~((monthNumber + paymentOrder - 1) / 12);
      const newYearNumber = yearNumber + yearsToAdd;
      return `${newYearNumber}.${this.padZeros(newMonthNumber, 2)}`;
    }
  },
  computed: {
    fieldsWithMonths() {
      const toAdd = [];
      if (process.client) {
        for (
          let paymentsIndex = +this.monthInterval.from;
          paymentsIndex < +this.monthInterval.to + 1;
          paymentsIndex++
        ) {
          const todayDate = new Date();
          const currentDate = new Date(
            todayDate.setMonth(todayDate.getMonth() + paymentsIndex)
          );
          const monthToShow = currentDate.getMonth() + 1;
          const yeatToShow = currentDate.getFullYear();
          const dateToShow = `${yeatToShow}.${this.padZeros(monthToShow, 2)}`;
          /* console.log(dateToShow); */
          const newField = {};
          newField[dateToShow] = "";
          newField.name = dateToShow;
          newField.label = dateToShow;
          newField.filter = { active: false, value: "", selected: false };
          newField.component = "no-editable";
          newField.options = { field: [dateToShow, "amount"] };
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
      paymentsInfo: "",
      monthInterval: {
        from: 0,
        to: 0
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
          filter: { active: false, value: "", selected: false },
          component: "no-editable",
          options: { field: ["name"] }
        },
        {
          name: "surname",
          label: this.$t("general.surname"),
          filter: { active: false, value: "", selected: false },
          component: "no-editable",
          options: { field: ["surname"] }
        }
      ],
      users: null
    };
  },
  async fetch() {
    const payments = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `payments/`
    });
    this.payments = payments.data;

    const toFetch = [
      this.$store.dispatch("auth/request", {
        method: "get",
        url: "groups"
      }),
      this.$store.dispatch("auth/request", {
        method: "get",
        url: `single/payment_data`
      })
    ];
    const apiReponses = await Promise.all(toFetch);
    let [groups, paymentsInfo] = apiReponses;
    let backendStudents = [this.user];
    groups = groups.data;
    this.paymentsInfo = paymentsInfo.data[0].body;
    console.log(this.paymentsInfo);
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
          linkSent: link_sent ?? ""
        };
      }
    );

    const mappedFrontendStudents = frontendStudents.map(el => el.id);

    this.payments.forEach(payment => {
      const studentIndex = mappedFrontendStudents.indexOf(payment.user_id);
      if (studentIndex === -1) {
        return;
      }
      const newLabel = this.preparePaymentDate(
        frontendStudents[studentIndex].startAt,
        payment.order_number
      );
      frontendStudents[studentIndex][newLabel] = {
        amount: payment.amount,
        order: payment.order_number
      };
    });

    this.users = frontendStudents;
  }
};
</script>
<style lang="scss" scoped>
.payments__input {
  width: 2.6rem;
}
.payments-data {
  margin-top: 4rem;
}
.payments-area {
  white-space: pre-line;
  margin-top: 0.5rem;
}
</style>
