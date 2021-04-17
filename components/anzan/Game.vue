<template>
  <component :is="states.current" @changeState="nextState" />
</template>
<script>
export default {
  components: {
    AnzanCountDown: () => import("@/components/anzan/CountDown.vue"),
    AnzanGameTime: () => import("@/components/anzan/GameTime.vue"),
    AnzanPutResult: () => import("@/components/anzan/PutResult.vue"),
    AnzanResult: () => import("@/components/anzan/Result.vue")
  },
  data() {
    return {
      states: {
        availables: ["anzan-count-down", "anzan-game-time", "anzan-put-result", "anzan-result"],
        current: "anzan-count-down"
      }
    };
  },
  methods: {
    getNextIndex(index, arrayToCheck) {
      if (index + 2 > arrayToCheck.length || index < 0) {
        console.log(index);
        return 0;
      } else {
        return ++index;
      }
    },
    nextState(state) {
      const { states, getNextIndex } = this;
      const availablesStates = states.availables;
      let stateIndex = availablesStates.indexOf(state);
      const nextIndex = getNextIndex(stateIndex, availablesStates);
      states.current = availablesStates[nextIndex];
    }
  }
};
</script>
