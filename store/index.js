import cookies from "js-cookie";

export const state = () => ({
  token: "",
  user: [],
  loginModal: false,
  registerModal: false,
  categories: []
});

export const mutations = {
  FETCH_ITEMS(state, categories) {
    state.categories = categories
  },
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
  toggleLoginModal(state, val) {
    state.loginModal = val;
  },
  toggleRegisterModal(state, val) {
    state.registerModal = val;
  },
};

export const actions = {
  fetchItems({ commit }) {
    this.$axios.get('/categories').then(res => {
      commit("FETCH_ITEMS", res.data.categories);
    })
  },
  getProfile({ commit }, token) {
    this.$axios.get("profile", {
      headers: {
        token: cookies.get('token')
      }
    }).then(res => {

      console.log(res.data)
    })
  },

  setToken({ commit }, token) {
    this.$axios.setToken(token.token, "Bearer");
    cookies.set("token", token.token);
    commit("SET_TOKEN", token.token);
    commit("SET_USER", token.userResponse);
  },

  logout({ commit }) {
    this.$axios.setToken(false);
    cookies.remove("token");
    this.$router.push("/");
    commit("REMOVE_TOKEN");
    commit("SET_USER");
  }
};
