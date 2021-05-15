<template>
  <div class="abacus">
    <header class="abacus__header">
      <div class="abacus__header--main">
        <span class="abacus__label">LEKCJA</span>
        <score-box
          :presences="{ present: $route.params['level'], total: 48 }"
        />
        <mark class="abacus__note">NOTATKA</mark>
      </div>
      <div class="abacus__header--sub">
        <span class="abacus__title">TYTUŁ LEKCJI</span>
      </div>
    </header>
    <abacus-box
      :exercises="allSamples"
      :results="results"
      :mode="'student'"
    ></abacus-box>
  </div>
</template>
<script>
import socket from "~/mixins/sockets.js";
import user from "~/mixins/user.js";
export default {
  mixins: [socket, user],
  components: {
    AbacusBox: () => import("@/components/abacus/Box.vue")
  },
  created() {
    if (process.client) {
      this.sendResult("game", {
        studentId: this.user.id,
        game: "abacus",
        action: "start",
        samples: this.allSamples
      });
    }
  },
  data() {
    return {
      allSamples: this.generateSamples(),
      results: []
    };
  },
  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    },
    checkProbability(probability) {
      return !!probability && Math.random() <= probability;
    },
    generateSamples() {
      const samplesNumber = 14;
      const sampleLenght = { min: 4, max: 6 };
      const interval = { min: 1, max: 9 };
      const negativeProbability = 0.3;
      const samples = [];
      let sampleIndex = 0;
      for (sampleIndex; sampleIndex < samplesNumber; sampleIndex++) {
        let numberInSampleIndex = 0;
        const sample = [];
        const currentSampleLenght = this.getRandomInt(
          sampleLenght.min,
          sampleLenght.max + 1
        );
        for (
          numberInSampleIndex;
          numberInSampleIndex < currentSampleLenght;
          numberInSampleIndex++
        ) {
          let randomNumber = this.getRandomInt(interval.min, interval.max + 1);
          if (this.checkProbability(negativeProbability)) {
            randomNumber *= -1;
          }
          sample.push(randomNumber);
        }
        while (sample.length < sampleLenght.max) {
          sample.unshift(0);
        }
        samples.push(sample);
      }
      return samples;
    }
  }
};
</script>
<style lang="scss" scope>
.abacus__header--main {
  align-items: center;
  display: flex;
  font-size: 1.5rem;
  flex-wrap: wrap;
}
.abacus__label {
  margin-right: 1rem;
}
.abacus__note {
  background-color: $yellow;
  border-radius: $appRadius;
  color: $black;
  padding: 0.25rem 1rem;
  margin-left: 1rem;
}
.abacus__header--sub {
  margin: 2rem 0;
}
.abacus__title {
  font-size: 1.25rem;
}
</style>
