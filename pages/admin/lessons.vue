<template>
  <div>
    <div>LIVE GAME</div>
    <div class="games">
      <div class="games__game" v-for="game in games" :key="game.studentId">
        <h2 class="games__student u-margin-small">{{game.studentId}} Jan Kowalski</h2>
        <abacus-box
          :exercises="game.exercises"
          :results="game.results"
          :mode="'admin'"
          :key="game.reload"
        ></abacus-box
        >
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
      console.log(message)
      const userIndex = this.games
        .map(game => game.studentId)
        .indexOf(message.studentId);
      if (message.game ==="abacus" && message.action === "start") {
        if (userIndex === -1) {
          this.games.push({
            studentId: message.studentId,
            game: message.game,
            exercises: message.samples,
            results: new Array(message.samples.length),
            reload: false
          });
        } else {
          this.reloadGame(userIndex);
          this.$set(this.games, userIndex, {
            studentId: message.studentId,
            game: message.game,
            exercises: message.samples,
            results: new Array(message.samples.length),
            reload: false
          });
        }
      } else if (message.game ==="abacus" && message.action === "result") {
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
.games__student {
  text-align: center;
}
</style>
