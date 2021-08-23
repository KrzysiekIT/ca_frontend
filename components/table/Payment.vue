<template>
  <client-only>
    <v-date-picker
      :masks="masks"
      @input="changeDateFormatAndEmit"
      v-model="toSend.value"
    >
      <template v-slot="{ inputEvents }">
        <input
          ref="dateInput"
          :readonly="readonly"
          v-model="toSend.value"
          v-on="inputEvents"
          class="date__input"
          @blur="saveChanges()"
          placeholder="Kwota"
        />
      </template>
    </v-date-picker>
  </client-only>
</template>
<script>
import { getDeepValue } from "~/static/helper.js";
export default {
  props: {
    options: {
      type: Object,
      required: true
    },
    info: {
      type: Object,
      required: true
    },
    row: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      readonly: true,
      masks: { input: "DD.MM.YYYY" },
      toSend: {
        name: "changeValue",
        date: new Date(),
        field: this.options.field,
        row: this.row,
        value: getDeepValue(this.info, this.options.field)
      }
    };
  },
  watch: {
    "toSend.value": {
      handler(newValue, oldValue) {
        if (typeof newValue === "object") {
          const clearDate = new Date(
            newValue.getTime() - newValue.getTimezoneOffset() * 60000
          ).toISOString();

          const newDate = clearDate.slice(0, 19).replace("T", " ");
          this.toSend.date = newDate;
          this.toSend.value = oldValue;
        }
      }
    }
  },
  methods: {
    monthDiff(dateFrom, dateTo) {
      return (
        dateTo.getMonth() -
        dateFrom.getMonth() +
        12 * (dateTo.getFullYear() - dateFrom.getFullYear())
      );
    },
    saveChanges() {
      const currentInfo = this.info[this.options.field[0]];
      let orderNumber;
      if (currentInfo) {
        orderNumber = currentInfo.order;
      } else {
        let fieldDate = this.options.field[0];
        fieldDate = new Date(
          +fieldDate.substring(0, 4),
          +fieldDate.substring(5, 7) - 1
        );
        const firstDate = new Date(this.info.startAt);
        const newOrderNumber = this.monthDiff(firstDate, fieldDate);
        console.log(firstDate, fieldDate, newOrderNumber);
        orderNumber = newOrderNumber;
      }
      const userId = this.info.id;
      const newValues = {
        createdAt: this.toSend.date,
        amount: +this.toSend.value
      };

      this.$store.dispatch("auth/request", {
        method: "patch",
        url: `payments/update/${userId}/${orderNumber}`,
        data: { newValues }
      });
    },
    changeDateFormatAndEmit(event) {
      this.readonly = false;
      this.$refs.dateInput.focus();
      /* const newDate = this.toSend.value
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      this.toSend.value = newDate; */
      /* this.$emit("action", this.toSend); */
    }
  }
};
</script>
<style lang="scss" scoped>
.date__input {
  width: 100%;
}
</style>
