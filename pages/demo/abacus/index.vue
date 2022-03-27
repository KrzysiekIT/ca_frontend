<template>
  <div class="abacus">
    <div :class="`grid-${indexInterval}`">
      <button
        class="nav back"
        @click="load('prev')"
        v-if="currentIndex !== minIndex"
      >
        &lt;
      </button>
      <img
        :src="require(`~/assets/images/demo/${startIndex}-${endIndex}.png`)"
        class="img"
        :class="`img-${indexInterval}`"
      />
      <button
        class="nav next"
        @click="load('next')"
        v-if="currentIndex !== maxIndex"
      >
        &gt;
      </button>
      <label
        :class="`label input-${index}`"
        v-for="index in indexInterval"
        :key="index"
      >
        <input class="input" v-model="results[startIndex + index]" />
      </label>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    indexInterval() {
      if (this.currentIndex < this.border) {
        return this.borderInerval;
      }
      return 3;
    },
    startIndex() {
      return this.currentIndex + 1;
    },
    endIndex() {
      return this.currentIndex + this.indexInterval;
    },
  },
  data() {
    return {
      currentIndex: 0,
      minIndex: 0,
      maxIndex: 54,
      results: [],
      border: 30,
      borderInerval: 5
    };
  },
  methods: {
    load(direction) {
      let intervalToAdd =
        direction === "next" ? this.indexInterval : -this.indexInterval;
      if (direction === "prev" && this.currentIndex === this.border) {
        intervalToAdd = -this.borderInerval;
      }
      this.currentIndex += intervalToAdd;
    },
  },
};
</script>
<style lang="scss" scoped>
.abacus {
  margin-top: 4rem;
  display: flex;
  justify-content: center;
}
.grid-3 {
  display: grid;
  grid-template-areas: "back img img img next" ". input1 input2 input3 .";
}
.grid-5 {
  display: grid;
  grid-template-areas: "back img img img img img next" ". input1 input2 input3 input4 input5 .";
}
.nav {
  font-size: 10rem;
  align-self: center;
  color: $green;
  border: none;
  background-color: transparent;
}
.nav:hover {
  cursor: pointer;
}
.back {
  grid-area: back;
  margin-right: 1rem;
}
.next {
  grid-area: next;
  margin-left: 1rem;
}
.img {
  grid-area: img;
}
.img-3 {
  width: 50rem
}
.img-5 {
  width: 75rem
}
.label {
  display: flex;
  justify-content: center;
  margin-top: -6rem;
  padding: 1rem 0;
  background-color: $black;
}
.input {
  width: 14rem;
  height: 6rem;
}
.input-1 {
  grid-area: input1;
}
.input-2 {
  grid-area: input2;
}
.input-3 {
  grid-area: input3;
}
.input-4 {
  grid-area: input4;
}
.input-5 {
  grid-area: input5;
}
</style>