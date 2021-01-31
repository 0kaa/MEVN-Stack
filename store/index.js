import cookies from "js-cookie";

export const state = () => ({
  posts: [],
  token: "",
  user: [],
  loginModal: false,
  registerModal: false
});

export const mutations = {
  SET_TOKEN(state, data) {
    state.token = data;
  },
  SET_USER(state, data) {
    state.user = data;
  },
  REMOVE_TOKEN(state) {
    state.token = null;
  },
  REMOVE_USER(state) {
    state.user = null;
  },
  setPosts(state, data) {
    state.posts = data;
  },
  pushPosts(state, data) {
    state.posts.posts.unshift(data);
  },
  loadMorePosts(state, data) {
    for (let i = 0; i <= data.posts.length - 1; i++) {
      state.posts.posts.push(data.posts[i]);
    }
    state.posts.totalPages = data.totalPages;
    state.posts.currentPage = data.currentPage;
  },
  toggleLoginModal(state, val) {
    state.loginModal = val;
  },
  toggleRegisterModal(state, val) {
    state.registerModal = val;
  }
};

export const actions = {
  setToken({ commit }, token) {
    this.$axios.setToken(token.token, "Bearer");
    cookies.set("x-access-token", token.token);
    cookies.set("username", token.userResponse.username);
    commit("SET_TOKEN", token.token);
    commit("SET_USER", token.userResponse);
  },

  logout({ commit }) {
    this.$axios.setToken(false);
    cookies.remove("x-access-token");
    cookies.remove("username");
    this.$router.push("/");
    commit("REMOVE_TOKEN");
    commit("SET_USER");
  }
};
