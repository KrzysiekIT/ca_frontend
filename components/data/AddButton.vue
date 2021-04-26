<template>
  <button class="add__button add__button--default" @click="add(models.backend)">
    {{ label }}
  </button>
</template>
<script>
export default {
  props: {
    baseTable: {
      type: Array,
      required: true
    },
    models: {
      type: Object,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    addUrl: {
      type: String,
      required: true
    }
  },
  methods: {
    async add(modelBackend) {
      const newId = (
        await this.$store.dispatch("auth/request", {
          method: "post",
          url: this.addUrl,
          data: { values: modelBackend }
        })
      ).data[1].id;
      const newRow = JSON.parse(JSON.stringify(this.models.frontend));
      newRow.id = newId;
      this.baseTable.unshift(newRow);
    }
  }
};
</script>
<style lang="scss" scoped>
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
</style>
