const actions = {
  setUser({ commit }, currentUser) {
    commit("setUser", currentUser);
  },

  setToken({ commit }, token) {
    commit("setToken", token);
  },

  setUsers({ commit }, users) {
    commit("setUsers", users);
  },

  setImages({ commit }, images) {
    commit("setImages", images);
  }
};

export default actions;
