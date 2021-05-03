<template>
  <div>
    <div>LIVE GAME</div>
    <div>{{ games }}</div>
  </div>
</template>
<script>
export default {
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
            results: new Array(message.samples.length)
          });
        }
      } else if (message.message === "anzan-result") {
        this.$set(this.games[userIndex].results, message.result.row, message.result.result);
      }
      console.log(this.games)
    });
  },
  data() {
    return {
      games: []
    };
  }
};
</script>
<style lang="scss" scoped></style>
