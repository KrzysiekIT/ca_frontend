<template>
  <div class="movies">
    <div class="movies__button-box">
      <label class="login--label">
        <span class="login--label__input"
          >{{ $t("general.url") }} (Youtube):</span
        >
        <input class="login--input" v-model="newMovie.link" />
      </label>
      <label class="login--label">
        <span class="login--label__input"
          >{{ $t("general.title_polish") }}:</span
        >
        <input class="login--input" v-model="newMovie.description_pl" />
      </label>
      <label class="login--label">
        <span class="login--label__input"
          >{{ $t("general.title_english") }}:</span
        >
        <input class="login--input" v-model="newMovie.description_en" />
      </label>
      <label class="login--label">
        <span class="login--label__input">Folder: </span>
        <select class="login--select" v-model="newMovie.exercise">
          <option
            v-for="exercise in exercises"
            :value="exercise.value"
            :key="exercise.value"
            >{{ exercise.label }}</option
          >
        </select>
      </label>
      <div class="movies__add-button-box">
        <button class="add__button add__button--default" @click="addMovie">
          {{ $t("general.add_video") }}
        </button>
      </div>
    </div>
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
        this.videos = [...movies];
      } else {
        this.videos = [...this.$store.state.movies.movies];
      }
    }
  },
  data() {
    return {
      videos: [],
      exercises: [{ label: this.$t("general.movies"), value: "movies" }],
      newMovie: {
        description_pl: "",
        description_en: "",
        link: "",
        exercise: "movies"
      }
    };
  },
  methods: {
    async addMovie() {
      let newMovie = await this.$store.dispatch("auth/request", {
        method: "post",
        url: "movies",
        data: {
          values: { ...this.newMovie }
        }
      });
      newMovie = newMovie.data[1][0];
      this.$store.commit("movies/addNewMovie", newMovie);
      this.videos.push(newMovie);
      this.newMovie = {
        description_pl: "",
        description_en: "",
        link: "",
        exercise: "movies"
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.movies {
  display: flex;
  flex-wrap: wrap;
}
.movies__button-box {
  width: 100%;
  padding-left: 2rem;
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
.add__button {
  border: none;
  border-radius: $appRadius;
  color: $white;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 0.5rem;
  min-width: 8rem;
  outline: none;
  padding: 0.625rem;
}
.add__button:active {
  transform: scale(0.95);
}
.add__button--default {
  background-color: $resultNeutralBlue;
}
.add__button--default:hover {
  background-color: darken($resultNeutralBlue, 15%);
}
.movies__input {
  display: block;
  width: 100%;
}
.movies__add-button-box {
  display: flex;
  width: 26rem;
  justify-content: flex-end;
}
.login--label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.25rem;
  width: 26rem;
  font-size: 1rem;
  padding-bottom: 0.25rem;
}
.login--input {
  border: none;
  border-radius: $appRadius;
  display: block;
  font-size: 1rem;
  padding: 0.1rem;
  padding-left: 0.25rem;
}
.login--select {
  border: none;
  border-radius: $appRadius;
  display: block;
  font-size: 1rem;
  padding: 0.1rem;
  width: 12rem;
  padding-left: 0.25rem;
}
.login--label__input {
  display: block;
}
.login--link {
  color: #3c69bd;
  font-size: 1.5rem;
  text-decoration: none;
}
input:focus {
  box-shadow: 0 0 0 0.125rem #d48a0b;
  outline: none;
}
</style>
