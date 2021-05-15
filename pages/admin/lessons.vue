<template>
  <div>
    <div>LIVE GAME</div>
    <div class="games">
      <div class="games__game" v-for="game in games" :key="game.studentId">
        <h2 class="games__student u-margin-small">
          <span>{{ game.studentId }} Jan Kowalski</span>
          <br />
          <small>{{ game.game }}</small>
        </h2>
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
import socket from "~/mixins/sockets.js";
export default {
  components: {
    AbacusBox: () => import("@/components/abacus/Box.vue")
  },
  mixins: [socket],
  mounted() {
    this.socket.on("game", (message, cb) => {
      let userIndex = this.games
        .map(game => game.studentId)
        .indexOf(message.studentId);
      const userFound = userIndex !== -1 ? true : false;

      if (userIndex === -1) {
        userIndex = this.games.length;
      }

      if (message.game === "abacus") {
        if (message.action === "start") {
          this.$set(this.games, userIndex, {
            studentId: message.studentId,
            game: message.game,
            exercises: message.samples,
            results: new Array(message.samples.length),
            reload: false
          });
        } else if (message.action === "result") {
          if (!userFound) {
            this.sendResult("game", {
              studentId: message.studentId,
              game: "abacus",
              action: "info-needed"
            });
          } else {
            this.$set(
              this.games[userIndex].results,
              message.result.row,
              message.result.result
            );
          }
        } else if (message.action === "info") {
          this.$set(this.games, userIndex, {
            studentId: message.studentId,
            game: message.game,
            exercises: message.samples,
            results: message.results,
            reload: false
          });
        }
      }

      console.log(message);
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
