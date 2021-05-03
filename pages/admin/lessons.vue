<template>
  <div>
    <div>LIVE GAME</div>
    <div class="games">
      <div class="games__game" v-for="game in games" :key="game.studentId">
        <abacus-box
          :exercises="game.exercises"
          :results="game.results"
          :mode="'admin'"
          :key="game.reload"
        ></abacus-box>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    AbacusBox: () => import("@/components/abacus/Box.vue")
  },
  mounted() {
    this.socket = this.$nuxtSocket({});
    this.socket.on("game", (message, cb) => {
      const userIndex = this.games
        .map(game => game.studentId)
        .indexOf(message.studentId);
      if (userIndex === -1) {
        if (message.message === "anzan-start") {
          this.games.push({
            studentId: message.studentId,
            game: message.game,
            exercises: message.samples,
            results: new Array(message.samples.length),
            reaload: false
          });
        }
      } else if (message.message === "anzan-result") {
        this.reloadGame(userIndex);
        this.$set(
          this.games[userIndex].results,
          message.result.row,
          message.result.result
        );
      }
      console.log(this.games);
    });
  },
  data() {
    return {
      games: [],
      reload: false
    };
  },
  methods: {
    reloadGame(userIndex) {
      this.games[userIndex].reload = !this.games[userIndex].reload;
    }
  }
};
</script>
<style lang="scss" scoped>
.games {
  display: flex;
  flex-wrap: wrap;
}
.games__game {
  border: $tableBorder;
  width: 50%;
}
</style>
