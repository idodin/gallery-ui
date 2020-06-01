const mutations = {
  setUser(state, user) {
    state.user = user;
    if (user == null) state.isLoggedIn = false;
    else state.isLoggedIn = true;
  },

  setToken(state, token) {
    state.token = token;
  },

  setUsers(state, users) {
    state.users = users;
  },

  setImages(state, images) {
    state.images = images;
  }
};

export default mutations;
