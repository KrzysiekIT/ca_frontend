<template>
  <table class="level">
    <tbody>
      <tr
        class="level__tr"
        v-for="levelHeight in height"
        :key="'level' + levelHeight"
      >
        <td
          class="level__td"
          :class="
            `level__td--${isLocked(
              currentNumber(levelHeight, width, levelWidth),
              borderNumber
            )}`
          "
          v-for="levelWidth in width"
          :key="'level' + levelWidth"
          @click="
            mode === 'admin' &&
              changeLock(currentNumber(levelHeight, width, levelWidth))
          "
        >
          <nuxt-link
            class="level__link"
            :event="mode === 'admin' ? '' : 'click'"
            :to="{
              path: `${page}/${currentNumber(levelHeight, width, levelWidth)}`,
              query: $route.query
            }"
            v-if="
              isLocked(
                currentNumber(levelHeight, width, levelWidth),
                borderNumber
              ) === 'unlocked'
            "
            >{{ currentNumber(levelHeight, width, levelWidth) }}</nuxt-link
          >
          <span v-else>{{ currentNumber(levelHeight, width, levelWidth) }}</span
          ><!--remove space trick-->
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  props: {
    page: {
      type: String,
      required: true
    },
    mode: {
      type: String
    },
    borderNumber: {
      type: Number
    }
  },
  data() {
    return {
      height: 6,
      width: 8
    };
  },
  methods: {
    currentNumber(levelHeight, width, levelWidth) {
      return (levelHeight - 1) * width + levelWidth;
    },
    isLocked(currentNumber, borderNumber) {
      return currentNumber < borderNumber ? "unlocked" : "locked";
    },
    changeLock(level) {
      this.$emit("changeLock", level);
    }
  }
};
</script>
<style lang="scss" scope>
.level {
  width: 100%;
  border-spacing: 0.125rem;
}
.level__td {
  border-radius: $appRadius;
  color: $mainBackground;
  font-size: 2rem;
  text-align: center;
}
.level__td--unlocked {
  background-color: $lightBlue;
  cursor: pointer;
}
.level__td--locked {
  background-color: #d8d8d8;
}
.level__td--locked::after {
  content: url("~assets/images/lock.svg");
  display: inline-block;
  width: 1.5rem;
}
.level__link {
  color: $mainBackground;
  display: block;
  height: 100%;
  text-decoration: none;
  transition: all 0.5s;
  width: 100%;
}
.level__link:hover {
  transform: scale(1.1);
}
</style>
