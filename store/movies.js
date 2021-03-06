export const state = () => ({
  movies: [],
  downloaded: false
});

export const mutations = {
  setNewMovies(state, movies) {
    state.movies = movies;
    state.downloaded = true;
  },
  addNewMovie(state, movie) {
    state.movies.push(movie);
  },
  removeAt(state, index) {
    state.movies.splice(index, 1);
  },
  reset(state) {
    state.downloaded = false;
  }
};
