<template>
  <div class="movies">
    <div
      class="movies__movie-box"
      v-for="(video, index) in videos"
      :key="'video' + index"
      @mouseover="sendMessage(index)"
    >
      <h2 class="movies__title">{{ video[`description_${$i18n.locale}`] }}</h2>
      <video-embed :src="video.link"></video-embed>
    </div>
  </div>
</template>
<script>
import socket from "~/mixins/sockets.js";
import user from "~/mixins/user.js";
export default {
  mixins: [socket, user],
  async created() {
    if (process.client) {
      if (!this.$store.state.movies.downloaded) {
        let movies = await this.$store.dispatch("auth/request", {
          method: "get",
          url: `movies`
        });
        movies = movies.data;
        this.$store.commit("movies/setNewMovies", movies);
        this.videos = movies;
      } else {
        this.videos = this.$store.state.movies.movies;
      }
      this.sendResult("game", {
        studentId: this.user.id,
        game: "movies",
        action: "lesson-choice"
      });
    }
  },
  data() {
    return {
      lastIndex: -1,
      videos: []
    };
  },
  methods: {
    sendMessage(index) {
      if (index === this.lastIndex) {
        return;
      }
      this.lastIndex = index;
      this.sendResult("game", {
        studentId: this.user.id,
        game: "movies",
        action: "lesson-selected",
        file: this.videos[index],
        videoId: this.videos[index].id,
        level: this.videos[index].id
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.movies {
  display: flex;
  flex-wrap: wrap;
}
.movies__movie-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
}
.movies__title {
  max-width: 16rem;
  text-align: center;
}
</style>
