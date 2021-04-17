<template>
  <component :is="state" @start="state='anzan-game'" />
</template>
<script>
export default {
  components: {
    AnzanSettings: () => import("@/components/anzan/Settings.vue"),
    AnzanGame: () => import("@/components/anzan/Game.vue")
  },
  data() {
    return {
      state: "anzan-settings"
    };
  }
};
</script>
