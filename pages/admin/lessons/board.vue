<template>
  <div>
    <nuxt-link to="/admin/lessons" class="back"><fa icon="arrow-left" /></nuxt-link>
    <div class="games">
      <div class="games__game" v-for="game in games" :key="game.studentId">
        <h2 class="games__student u-margin-small">
          <span>{{ findFullName(game.studentId) }}</span
          ><input
            v-model="note"
            class="abacus__note"
            @change="sendNote(note, game.studentId)"
          />
          <br />
          <small>{{ game.game }}</small>
        </h2>
        <abacus-box
          :exercises="game.exercises"
          :results="game.results"
          :mode="'admin'"
          v-if="game.ready && game.game === 'abacus'"
        ></abacus-box>
        <lesson-box
          :mode="'admin'"
          v-if="game.action === 'settings' && game.game === 'abacus'"
          @changeLock="changeLock(game.studentId, $event, 'abacus')"
          page="abacus"
          :borderNumber="game.borderNumber"
        ></lesson-box>
        <lesson-box
          :mode="'admin'"
          page="anzan"
          v-if="game.actions === 'settings' && game.game === 'anzan'"
          :borderNumber="game.borderNumber"
        ></lesson-box>
        <div class="games__video">
          <video-embed
            :src="game.link"
            v-if="game.ready && game.game === 'movies'"
          ></video-embed>
        </div>
        <div class="games__reading">
          <iframe
            :src="game.link"
            :title="game.title"
            v-if="game.ready && game.game === 'fast-reading'"
            class="embed-responsive-item"
          ></iframe>
        </div>
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
  async fetch() {
    const students = await this.$store.dispatch("auth/request", {
      method: "get",
      url: `students/multiplegroups/${this.$route.query.id}`
    });
    this.students = students.data;
  },
  mounted() {
    this.socket.on("game", (message, cb) => {
      console.log(message);
      if (message.demoId) {
        let userIndex = this.games
          .map(game => game.studentId)
          .indexOf(message.studentId);
        const userFound = userIndex !== -1 ? true : false;
        let theSameGame = true;
        if (!userFound || this.games[userIndex].game !== message.game) {
          theSameGame = false;
        }

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
              ready: true
            });
          } else if (message.action === "result") {
            if (!userFound || !theSameGame) {
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
              ready: true
            });
          } else if (message.action === "lesson-choice") {
            this.$set(this.games, userIndex, {
              studentId: message.studentId,
              game: message.game,
              ready: false
            });
          } else if (message.action === "settings") {
            this.$set(this.games, userIndex, {
              studentId: message.studentId,
              game: message.game,
              borderNumber: message.borderNumber,
              action: message.action,
              ready: false
            });
          }
        }
      } else {
        if (!this.studentsIds.includes(message.studentId)) {
          return;
        }
        let userIndex = this.games
          .map(game => game.studentId)
          .indexOf(message.studentId);
        const userFound = userIndex !== -1 ? true : false;
        let theSameGame = true;
        if (!userFound || this.games[userIndex].game !== message.game) {
          theSameGame = false;
        }

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
              ready: true
            });
          } else if (message.action === "result") {
            if (!userFound || !theSameGame) {
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
              ready: true
            });
          } else if (message.action === "lesson-choice") {
            this.$set(this.games, userIndex, {
              studentId: message.studentId,
              game: message.game,
              ready: false
            });
          } else if (message.action === "settings") {
            this.$set(this.games, userIndex, {
              studentId: message.studentId,
              game: message.game,
              borderNumber: message.borderNumber,
              action: message.action,
              ready: false
            });
          }
        } else if (message.game === "fast-reading") {
          if (message.action === "lesson-selected") {
            console.log(message);
            this.$set(this.games, userIndex, {
              studentId: message.studentId,
              game: message.game,
              link: message.file.link,
              title: message.file.title,
              ready: true
            });
          } else if (message.action === "lesson-choice") {
            this.$set(this.games, userIndex, {
              studentId: message.studentId,
              game: message.game,
              ready: false
            });
          }
        } else if (message.game === "movies") {
          if (message.action === "lesson-selected") {
            console.log(message);
            this.$set(this.games, userIndex, {
              studentId: message.studentId,
              game: message.game,
              link: message.file.link,
              title: message.file.title,
              ready: true
            });
          } else if (message.action === "lesson-choice") {
            this.$set(this.games, userIndex, {
              studentId: message.studentId,
              game: message.game,
              ready: false
            });
          }
        } else if (message.game) {
          this.$set(this.games, userIndex, {
            studentId: message.studentId,
            game: message.game,
            ready: false
          });
        }
      }
    });
  },
  computed: {
    studentsIds() {
      const result = this.students ? this.students.map(el => el.id) : [];
      return result;
    }
  },
  data() {
    return {
      games: [],
      reload: false,
      students: [],
      note: this.$t("general.note")
    };
  },
  methods: {
    reloadGame(userIndex) {
      this.games[userIndex].reload = !this.games[userIndex].reload;
    },
    findFullName(userId) {
      const studentIndex = this.studentsIds.indexOf(userId);
      if (!this.students) {
        return userId;
      }
      return `${this.students[studentIndex]?.name} ${this.students[studentIndex]?.surname}`;
    },
    sendNote(note, userId) {
      this.sendResult("game", {
        studentId: userId,
        game: "abacus",
        action: "note",
        note
      });
    },
    changeLock(userId, level, game) {
      this.$store
        .dispatch("auth/request", {
          method: "patch",
          url: `students/${userId}`,
          data: {
            newValues: {
              [`${game}_level`]: level
            }
          }
        })
        .then(() => {
          this.sendResult("game", {
            studentId: userId,
            game: "abacus",
            action: "unlock"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.back {
  font-size: 4rem;
  color: $green;
}
.games {
  display: flex;
  flex-wrap: wrap;
}
.games__game {
  border: $tableBorder;
  width: 50%;
  height: 75vh;
  overflow: scroll;
}
.games__student {
  text-align: center;
}
.games__video,
.games__reading {
  display: flex;
  justify-content: center;
}
.abacus__note {
  background-color: $yellow;
  border-radius: $appRadius;
  color: $black;
  padding: 0.25rem 1rem;
  margin-left: 1rem;
}
</style>
