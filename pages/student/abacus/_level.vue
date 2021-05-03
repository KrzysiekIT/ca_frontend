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
    <div class="abacus__box">
      <div
        class="abacus__samples"
        v-for="(samples, index) in allSamples"
        :key="'samples' + index"
      >
        <div
          class="abacus__sample"
          v-for="(sample, index) in samples"
          :key="'sample' + index"
        >
          {{ assignSign(sample) }}
        </div>
        <hr class="abacus__line" />
        <input
          @blur="acceptResult($event, samples, index)"
          class="abacus__input"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created() {
    if (process.client) {
      this.socket = this.$nuxtSocket({});
      this.sendResult({
        studentId: this.user.id,
        game: "anzan",
        message: "anzan-start",
        samples: this.allSamples
      });
    }
  },
  computed: {
    user() {
      return (this.$store.state.auth || {}).user || null;
    }
  },
  data() {
    return {
      allSamples: [
        [-3, 1, 4, 5],
        [3, 1, 4, 5],
        [8, 1, 4, 5],
        [-3, 1, 6, 5],
        [-3, 3, 4, 5],
        [-3, 1, 7, 5],
        [3, 2, 4, 5],
        [-3, 1, -9, 5],
        [-3, 1, 4, 4],
        [3, 1, 4, 5],
        [-3, 2, 4, 5],
        [-3, 1, 4, 5],
        [3, 1, 7, 8]
      ],
      results: []
    };
  },
  methods: {
    assignSign(numberToSign) {
      return (numberToSign < 0 ? "" : "+") + numberToSign;
    },
    sendResult(toSend) {
      this.socket.emit("game", toSend, res => {
        console.log(res);
      });
    },
    setResult(value, index) {
      this.results[index] = value;
    },
    acceptResult(event, samples, exampleIndex) {
      const result = +event.target.value;
      this.setResult(result, exampleIndex);
      this.sendResult({
        studentId: this.user.id,
        game: "anzan",
        message: "anzan-result",
        result: {
          row: exampleIndex,
          result
        }
      });
      this.checkResult(event, samples);
    },
    checkResult(event, samples) {
      const sum = samples.reduce(
        (factorFirst, factorSecond) => factorFirst + factorSecond,
        0
      );
      event.target.classList.remove("abacus__input--wrong");
      event.target.classList.remove("abacus__input--ok");
      if (event.target.value.length > 0) {
        if (+event.target.value === sum) {
          event.target.className += " abacus__input--ok";
        } else {
          event.target.className += " abacus__input--wrong";
        }
      }
    },
    generateSamples() {
      const samplesNumber = 50;
      const sampleLenght = { min: 4, max: 6 };
      const interval = { min: 100, max: 999 };
    }
  }
};
</script>
<style lang="scss" scope>
$sampleWidth: 4rem;
.abacus__header--main {
  align-items: center;
  display: flex;
  font-size: 1.5rem;
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
.abacus__box {
  display: flex;
  flex-wrap: wrap;
}
.abacus__samples {
  padding: 0.25rem;
}
.abacus__sample {
  font-size: 2rem;
  display: flex;
  justify-content: center;
  width: $sampleWidth;
}
.abacus__line {
  color: $lightBlue;
  background-color: $lightBlue;
  height: 0.125rem;
  margin: 0.5rem 0;
  width: $sampleWidth;
}
.abacus__input {
  border: none;
  border-radius: $appRadius;
  font-size: 2rem;
  width: $sampleWidth;
  outline: none;
  text-align: center;
}
.abacus__input--ok {
  background-color: $green;
}
.abacus__input--wrong {
  background-color: $yellow;
}
</style>
