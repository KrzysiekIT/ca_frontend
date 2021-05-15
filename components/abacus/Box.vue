<template>
  <div class="abacus__box">
    <div
      class="abacus__samples"
      v-for="(samples, index) in exercises"
      :key="'samples' + index"
    >
      <div
        class="abacus__sample"
        v-for="(sample, index) in samples"
        :key="'sample' + index"
      >
        <span v-if="sample!==0">
          {{ assignSign(sample) }}
        </span>
        <br v-else>
      </div>
      <hr class="abacus__line" />
      <input
        @blur="acceptResult($event, samples, index)"
        class="abacus__input"
        :class="checkSum(results[index], samples)"
        :readonly="settings[mode].readonly"
        v-model.lazy="results[index]"
      />
    </div>
  </div>
</template>
<script>
import socket from "~/mixins/sockets.js";
import user from "~/mixins/user.js";
export default {
  mixins: [socket, user],
  props: {
    exercises: {
      type: Array,
      required: true
    },
    results: {
      type: Array,
      required: true
    },
    mode: {
      type: String,
      required: true,
      validator: userType => ["student", "admin"].includes(userType)
    }
  },
  data() {
    return {
      settings: {
        student: {
          readonly: false,
          onchange: () => {}
        },
        admin: {
          readonly: true,
          onchange: this.checkResult
        }
      }
    };
  },
  methods: {
    assignSign(numberToSign) {
      return (numberToSign < 0 ? "" : "+") + numberToSign;
    },
    setResult(value, index) {
      this.results[index] = value;
    },
    acceptResult(event, samples, exampleIndex) {
      let result = event.target.value;
      if (result !== "") {
        result = +result;
      }
      this.setResult(result, exampleIndex);
      this.sendResult("game", {
        studentId: this.user.id,
        game: "anzan",
        message: "anzan-result",
        result: {
          row: exampleIndex,
          result
        }
      });
    },
    checkSum(userSum, numberArray) {
      if (
        userSum === "" ||
        userSum === null ||
        userSum == undefined ||
        userSum === NaN
      ) {
        return "";
      }
      const validSum = numberArray.reduce(
        (factorFirst, factorSecond) => factorFirst + factorSecond,
        0
      );
      if (validSum === +userSum) {
        return "abacus__input--ok";
      } else {
        return "abacus__input--wrong";
      }
    }
  }
};
</script>
<style lang="scss" scoped>
$sampleWidth: 4rem;
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
