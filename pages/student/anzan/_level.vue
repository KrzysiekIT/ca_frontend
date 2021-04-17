<template>
  <component
    :is="state.current"
    :options="state.options"
    @changeState="changeState"
  />
</template>
<script>
export default {
  components: {
    AnzanCountDown: () => import("@/components/anzan/CountDown.vue"),
    AnzanGameTime: () => import("@/components/anzan/GameTime.vue"),
    AnzanPutResult: () => import("@/components/anzan/PutResult.vue"),
    AnzanResult: () => import("@/components/anzan/Result.vue"),
    AnzanSettings: () => import("@/components/anzan/Settings.vue")
  },
  data() {
    return {
      state: {
        current: "anzan-settings",
        options: null
      }
    };
  },
  methods: {
    changeState({ state, options = null }) {
      const newState = { current: state, options };
      this.state = newState;
    }
  }
};
</script>
