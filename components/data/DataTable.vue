<template>
  <table class="data__table" v-if="filtered">
    <thead>
      <tr>
        <th class="data__table-th" v-if="showNumbers">Lp.</th>
        <th
          v-for="({ label }, index) in fields"
          :key="'th' + index"
          class="data__table-th"
        >
          {{ label }}
        </th>
      </tr>
      <tr>
        <th class="data__table-th" v-if="showNumbers"></th>
        <th
          v-for="({ filter, options, component }, index) in fields"
          :key="'filter' + index"
          class="data__table-th"
        >
          <autocomplete
            :key="refresh + index"
            :items="
              component === 'select-option'
                ? selectOptions[options.options]
                : Array.from(
                    new Set(
                      filtered.map(data => {
                        return getDeepValue(data, options['field']);
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
        v-for="(data, dataIndex) in filtered"
        :key="'data' + data.id + dataIndex"
        @click="highlight(dataIndex)"
        class="data__table-row"
        :class="highlighted === dataIndex ? 'data__table-row--hightligted' : ''"
      >
        <td class="data__table-td" v-if="showNumbers">{{ dataIndex + 1 }}</td>
        <td
          v-for="(row, rowIndex) in fields"
          :key="row.name + rowIndex"
          class="data__table-td"
        >
          <component
            :is="row.component"
            :options="row.options"
            :info="data"
            :row="dataIndex"
            :selectOptions="selectOptions[row.options.options]"
            :key="getDeepValue(data, row.options['field'])"
            @action="handleAction"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    showNumbers: {
      type: Boolean,
      default: false
    },
    fields: {
      type: Array,
      required: true
    },
    selectOptions: {
      type: Object,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    apiUrl: {
      type: String,
      required: true
    },
    refresh: {
      type: Boolean
    }
  },
  components: {
    LinkButton: () => import("@/components/table/LinkButton.vue"),
    ActionButton: () => import("@/components/table/ActionButton.vue"),
    SelectOption: () => import("@/components/table/SelectOption.vue"),
    CalendarPicker: () => import("@/components/table/CalendarPicker.vue"),
    Editable: () => import("@/components/table/Editable.vue"),
    NoEditable: () => import("@/components/table/NoEditable.vue"),
    Payment: () => import("@/components/table/Payment.vue")
  },
  data() {
    return {
      highlighted: null
    };
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
    filtered() {
      const { filters, data, getDeepValue } = this;
      let newData = data;
      const filtersLength = this.filters.length;
      let filterIndex = 0;
      for (filterIndex; filterIndex < filtersLength; filterIndex++) {
        newData = newData.filter(data => {
          if (!data.id) {
            return false;
          }
          let deepValue;
          deepValue = getDeepValue(data, filters[filterIndex]["field"]);
          if (
            filters[filterIndex]["component"] === "select-option" &&
            !filters[filterIndex]["selected"]
          ) {
            deepValue = this.selectOptions[
              filters[filterIndex]["options"]
            ].find(option => option.value === deepValue).label;
          } else if (filters[filterIndex]["selected"]) {
            deepValue = this.selectOptions[
              filters[filterIndex]["options"]
            ].find(option => option.value === deepValue);
          }
          if (filters[filterIndex]["selected"]) {
            const stay =
              deepValue.value ===
              this.selectOptions[filters[filterIndex]["options"]].find(
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
      return newData;
    }
  },
  methods: {
    async patch(dataId, change) {
      await this.$store.dispatch("auth/request", {
        method: "patch",
        url: `${this.apiUrl}/${dataId}`,
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
        value = value?.[fields?.[fieldIndex]];
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
    async changeDeepValue(sourceObject, fields, newValue, base, options) {
      let value = sourceObject;
      const dataId = sourceObject.id;
      const fieldsLength = fields.length;
      let fieldIndex = 0;
      for (fieldIndex; fieldIndex < fieldsLength; fieldIndex++) {
        if (fieldIndex === fieldsLength - 1) {
          await this.patch(dataId, { [this.mapFields(fields)]: newValue });
          //value[fields[fieldIndex]] = newValue;
          if (base) {
            const newValueObject = this.selectOptions[options].find(
              ({ value }) => value === newValue
            );
            sourceObject[base] = newValueObject;
          }
        } else {
          value = value[fields[fieldIndex]];
        }
      }
    },
    highlight(rowIndex) {
      this.highlighted = rowIndex;
    },
    handleAction(details) {
      const actions = {
        changeValue: options => {
          this.changeDeepValue(
            this.data[options.row],
            options.field,
            options.value,
            options.base,
            options.options
          );
        },
        remove: ({ row }) => {
          this.data.splice(row, 1);
        }
      };
      actions[details.name](details);
    }
  }
};
</script>
<style lang="scss" scoped>
.data {
  max-height: 0;
}
.data__header {
  padding-bottom: 1rem;
}
.data__table {
  border: solid 2px $white;
  border-collapse: collapse;
  min-width: 100%;
  overflow: scroll;
}
.data__table-row--hightligted {
  background-color: lighten($mainBackground, 10);
}
.data__table-td {
  border: solid 2px $white;
  padding: 0.5rem;
  text-align: center;
  min-width: 6rem;
}
.data__table-th {
  border: solid 2px $white;
  padding: 0.5rem;
}
</style>
