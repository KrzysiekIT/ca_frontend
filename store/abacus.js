export const state = () => ({
  lessons: [],
  downloaded: false
});

export const mutations = {
  setNewLessons(state, lessons) {
    state.lessons = lessons;
    state.downloaded = true;
  }
};
