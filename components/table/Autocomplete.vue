<template>
  <div class="autocomplete">
    <input
      type="text"
      @input="onChange"
      v-model="search"
      @keydown.down="onArrowDown"
      @keydown.up="onArrowUp"
      @keydown.enter="onEnter"
      placeholder="Zacznij wpisywać…"
      class="autocomplete-input"
    />
    <ul id="autocomplete-results" v-show="isOpen" class="autocomplete-results">
      <li class="loading" v-if="isLoading">
        Loading results...
      </li>
      <li
        v-else
        v-for="(result, i) in results"
        :key="i"
        @click="setResult(result)"
        class="autocomplete-result"
        :class="{ 'is-active': i === arrowCounter }"
      >
        <div>
          <strong>{{ result }}</strong>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "autocomplete",
  emits: ["input", "set"],
  props: {
    items: {
      type: Array,
      required: false,
      default: () => []
    },
    isAsync: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      isOpen: false,
      results: [],
      search: "",
      isLoading: false,
      arrowCounter: 0
    };
  },

  methods: {
    onChange() {
      // Let's warn the parent that a change was made
      this.$emit("input", this.search);

      // Is the data given by an outside ajax request?
      if (this.isAsync) {
        this.isLoading = true;
      } else {
        // Let's  our flat array
        this.filterResults();
        this.isOpen = true;
      }
    },

    filterResults() {
      // first uncapitalize all the things
      if (this.search == "") {
        this.results = [];
      } else {
        this.results = this.items.filter(item => {
          return item.toLowerCase().startsWith(this.search.toLowerCase());
        });
      }
    },
    setResult(result) {
      this.search = result;
      this.isOpen = false;
      this.$emit("set", result);
    },
    onArrowDown() {
      if (this.arrowCounter < this.results.length) {
        this.arrowCounter = this.arrowCounter + 1;
      }
    },
    onArrowUp() {
      if (this.arrowCounter > 0) {
        this.arrowCounter = this.arrowCounter - 1;
      }
    },
    onEnter() {
      this.search = this.results[this.arrowCounter];
      this.isOpen = false;
      this.$emit("set", this.results[this.arrowCounter]);
      this.arrowCounter = -1;
    },
    handleClickOutside(evt) {
      if (!this.$el.contains(evt.target)) {
        this.isOpen = false;
        this.arrowCounter = -1;
      }
    }
  },
  watch: {
    items: function(val, oldValue) {
      // actually compare them
      if (val.length !== oldValue.length) {
        this.results = val;
        this.isLoading = false;
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  unmounted() {
    document.removeEventListener("click", this.handleClickOutside);
  }
};
</script>

<style lang="scss" scoped>
.autocomplete {
  position: relative;
}

.autocomplete-input {
  border: none;
  border-radius: 10px;
  padding: 8px;
  font-size: 1rem;
}

.autocomplete-input:focus {
  outline: none;
}

.autocomplete-results {
  position: absolute;
  padding: 0;
  margin: 0;
  height: 200px;
  overflow: auto;
}

.autocomplete-result {
  background-color: $optionsBackground;
  border: $tableBorder;
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: $mainBackground;
  color: white;
}
</style>
