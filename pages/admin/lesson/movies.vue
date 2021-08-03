<template>
  <div class="movies">
    <div
      class="movies__movie-box"
      v-for="(video, index) in videos"
      :key="'video' + index"
    >
      <h2 class="movies__title">{{ video[`description_${$i18n.locale}`] }}</h2>
      <video-embed :src="video.link"></video-embed>
    </div>
  </div>
</template>
<script>
export default {
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
    }
  },
  data() {
    return {
      lastIndex: -1,
      videos: []
    };
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
