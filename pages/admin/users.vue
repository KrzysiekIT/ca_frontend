<template>
  <table class="users__table">
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
    </thead>
    <tbody>
      <tr
        v-for="(user, userIndex) in users"
        :key="'user' + userIndex"
        @click="highlight(userIndex)"
        class="user__table-row"
        :class="highlighted === userIndex ? 'user__table-row--hightligted' : ''"
      >
        <td
          v-for="(row, fieldIndex) in fields"
          :key="'td' + fieldIndex"
          class="users__table-td"
        >
          <component
            v-if="['link-button'].includes(row.component)"
            :is="'link-button'"
            :options="row.options"
            :info="user"
          />
          <div v-else>{{ getDeepValue(user, row.field) }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  components: {
    LinkButton: () => import("@/components/table/LinkButton.vue")
  },
  data() {
    return {
      highlighted: null,
      fields: [
        {
          label: "Obecności",
          component: "link-button",
          field: ["id"],
          options: { to: "presences/", field: ["id"] }
        },
        {
          label: "Płatności",
          component: "link-button",
          field: ["id"],
          options: { to: "payments/", field: ["id"] }
        },
        { label: "Status ucznia", component: "select", field: ["status"] },
        {
          label: "Data rozpoczęcia",
          component: "calendar",
          field: ["startDate"]
        },
        {
          label: "Imię i nazwisko dziecka",
          component: "editable",
          field: ["fullName"]
        },
        { label: "Rok urodzenia", component: "editable", field: ["birthYear"] },
        {
          label: "Imię i nazwisko rodzica",
          component: "editable",
          field: ["parent", "fullName"]
        },
        {
          label: "Adres e-mail rodzica",
          component: "editable",
          field: ["parent", "email"]
        },
        {
          label: "Telefon rodzica",
          component: "editable",
          field: ["parent", "phoneNumber"]
        },
        {
          label: "Trener",
          component: "select",
          field: ["trainer"]
        },
        {
          label: "Dzień zajęć",
          component: "select",
          field: ["day"]
        },
        {
          label: "Godzina zajęć",
          component: "select",
          field: ["hour"]
        },
        {
          label: "Link wysłany",
          component: "action-button",
          field: ["linkSend"]
        }
      ],
      users: [
        {
          id: 1,
          status: 0,
          startDate: Date.now(),
          fullName: "Jan Kowalski",
          birthYear: 1995,
          parent: {
            fullName: "Tata Nowak",
            email: "mama@nowak.pl",
            phoneNumber: "609328523"
          },
          trainer: "Jan Moskwa",
          day: "czwartek",
          hour: "18:00",
          linkSend: false
        },
        {
          id: 3,
          status: 2,
          startDate: Date.now(),
          fullName: "Jan Kowalski",
          birthYear: 1995,
          parent: {
            fullName: "Tata Nowak",
            email: "mama@nowak.pl",
            phoneNumber: "609328523"
          },
          trainer: "Jan Moskwa",
          day: "czwartek",
          hour: "18:00",
          linkSend: false
        },
        {
          id: 1,
          status: 0,
          startDate: Date.now(),
          fullName: "Jan Kowalski",
          birthYear: 1995,
          parent: {
            fullName: "Mama Nowak",
            email: "mama@nowak.pl",
            phoneNumber: "609328523"
          },
          trainer: "Jan Moskwa",
          day: "czwartek",
          hour: "18:00",
          linkSend: false
        },
        {
          id: 2,
          status: 0,
          startDate: Date.now(),
          fullName: "Jan Kowalski",
          birthYear: 1995,
          parent: {
            fullName: "Tata Nowak",
            email: "mama@nowak.pl",
            phoneNumber: "609328523"
          },
          trainer: "Jan Moskwa",
          day: "czwartek",
          hour: "18:00",
          linkSend: false
        },
        {
          id: 1,
          status: 0,
          startDate: Date.now(),
          fullName: "Jan Nowak",
          birthYear: 1995,
          parent: {
            fullName: "Tata Nowak",
            email: "mama@nowak.pl",
            phoneNumber: "609328523"
          },
          trainer: "Jan Moskwa",
          day: "środa",
          hour: "18:00",
          linkSend: true
        }
      ]
    };
  },
  methods: {
    getDeepValue(sourceObject, fields) {
      let value = sourceObject;
      const fieldsLength = fields.length;
      let fieldIndex = 0;
      for (fieldIndex; fieldIndex < fieldsLength; fieldIndex++) {
        value = value[fields[fieldIndex]];
      }
      return value;
    },
    highlight(rowIndex) {
      this.highlighted = rowIndex;
      //this.highlighted = this.highlighted === rowIndex ? null : rowIndex;
    }
  }
};
</script>
<style lang="scss" scoped>
.users__table {
  border: solid 2px $white;
  border-collapse: collapse;
  min-width: 100%;
  overflow: scroll;
}
.user__table-row--hightligted {
  background-color: $optionsBackground;
}
.users__table-td {
  border: solid 2px $white;
  padding: 0.5rem;
  text-align: center;
}
.users__table-th {
  border: solid 2px $white;
  padding: 0.5rem;
}
</style>
