export const state = () => ({
  current: {
    lesson_link: ""
  },
  downloaded: false
});

export const mutations = {
  setNewGroup(state, newGroup) {
    state.current = newGroup;
    state.downloaded = true;
  }
};
