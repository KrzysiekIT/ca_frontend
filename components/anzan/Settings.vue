<template>
  <div>
    <fieldset class="options">
      <div class="options__element">
        <div class="options__label">POZIOM</div>
        <div class="options__select-box--level">
          <app-select
            :options="[
              'podstawowy',
              'mały przyjaciel',
              'duży podstawowy',
              'mistrz'
            ]"
            :default="'podstawowy'"
            class="select"
            @input="showConsole($event)"
          />
        </div>
        <div class="options__select-box--extension">
          <app-select
            :options="['1-4', '1-9']"
            :default="'1-9'"
            class="select"
            @input="showConsole($event)"
          />
        </div>
      </div>
      <div class="options__element">
        <div class="options__label">PRĘDKOŚĆ</div>
        <input
          class="options__input options__input--number"
          type="text"
          inputmode="numeric"
          readonly
          v-model="speed.value"
        />
        <button
          @click="changeOptionValue(-1, speed)"
          class="options__button options__button--numeric"
        >
          -
        </button>
        <button
          @click="changeOptionValue(1, speed)"
          class="options__button options__button--numeric"
        >
          +
        </button>
      </div>
      <div class="options__element">
        <div class="options__label">ZŁOŻONOŚĆ</div>
        <fieldset class="options__value-box">
          <label
            v-for="(option, index) in complexity.values"
            :key="'complexity' + index"
            class="options__value-element"
            :class="
              `options__value-element--${
                option === complexity.chosen ? 'active' : 'default'
              }`
            "
            >{{ option }}
            <input
              type="radio"
              class="options__radio"
              :value="option"
              v-model="complexity.chosen"
            />
          </label>
        </fieldset>
      </div>

      <div class="options__element">
        <div class="options__label">LICZBA DZIAŁAŃ</div>
        <input
          class="options__input options__input--number"
          type="text"
          inputmode="numeric"
          readonly
          :value="operationNumber.value"
        />
        <button
          @click="changeOptionValue(-1, operationNumber)"
          class="options__button options__button--numeric"
        >
          -
        </button>
        <button
          @click="changeOptionValue(1, operationNumber)"
          class="options__button options__button--numeric"
        >
          +
        </button>
        <div>
          <label class="options__checkbox checkbox checkbox--inline">
            {{ $t("general.sound") }}
            <input type="checkbox" />
            <span class="checkmark"></span>
          </label>
          <div class="options__select-box">
            <app-select
              :options="['PL', 'EN']"
              :default="'PL'"
              class="select"
              @input="showConsole($event)"
            />
          </div>
        </div>
      </div>
    </fieldset>
    <div class="options__start-box">
      <button
        @click="$emit('changeState', { state: 'anzan-count-down' })"
        class="options__button options__button--transparent"
      >
        <figure>
          <img src="~/assets/images/rocket.png" alt="Start" height="128" />
          <figcaption class="options__label--start">START</figcaption>
        </figure>
      </button>
    </div>
  </div>
</template>
<style lang="scss" scope>
input[type="radio"] {
  opacity: 0;
}
.options {
  border: none;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-row: auto auto;

  &__label {
    font-size: 1.5rem;
    padding-bottom: 0.5rem;
    text-decoration: underline;
  }
}
.options__element {
  padding: 1rem 2rem 2rem 2rem;

  &:nth-child(2n-1) {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
.options__checkbox {
  margin-top: 2rem;
}
.options__select-box {
  display: inline-block;
  width: 5rem;
  margin-left: 0.5rem;
}
.options__select-box--level {
  width: 16rem;
}
.options__select-box--extension {
  width: 8rem;
}
.options__input {
  background-color: $optionsBackground;
  border: none;
  border-radius: $appRadius;
  color: $white;
  font-size: 1rem;
  outline: none;
  padding: 0.625rem;
}
.options__input--number {
  text-align: center;
  width: 8rem;
}
.options__button {
  border: none;
  border-radius: $appRadius;
  font-size: 1rem;
  min-width: 2rem;
  outline: none;
  padding: 0.625rem;
}
.options__button:hover {
  cursor: pointer;
}
.options__button:active {
  transform: scale(0.95);
}
.options__button--numeric {
  color: $mainBackground;
  background-color: $grayedWhite;
}
.options__button--numeric:hover {
  background-color: darken($grayedWhite, 15%);
}
.options__value-box {
  border: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
  width: 16rem;
}
.options__value-element {
  border-radius: $appRadius;
  padding: 0.625rem;
  text-align: center;
  width: calc(50% - 1px);
  margin-bottom: 2px;
}
.options__value-element--default {
  background-color: $optionsBackground;
}
.options__value-element--default:active {
  transform: scale(0.95);
}
.options__value-element:hover {
  background-color: darken($optionsBackground, 15%);
  cursor: pointer;
}
.options__value-element--active {
  background-color: $green;
}
.options__value-element--active:hover {
  background-color: $green;
  cursor: default;
}
.options__radio {
  opacity: 0;
}
.options__start-box {
  text-align: center;
}
.options__button--transparent {
  background-color: transparent;
  $color: $white;
  font-size: 2rem;
}
.options__label--start {
  color: $white;
}
</style>
<script>
export default {
  data() {
    return {
      speed: {
        name: "speed",
        value: 1.2,
        precision: 0.1
      },
      operationNumber: {
        name: "operationNumber",
        value: 8,
        precision: 1
      },
      complexity: { values: [1, 10, 100, 1000, 10000, 100000], chosen: 100 }
    };
  },
  methods: {
    showConsole(event) {
      console.log(event);
    },
    changeOptionValue(direction, type) {
      const newValue =
        Math.round(
          (this[type.name]["value"] + direction * type.precision) * 10
        ) / 10;
      this[type.name]["value"] = newValue;
    }
  }
};
</script>
