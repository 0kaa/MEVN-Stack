import cookies from "js-cookie";

export const state = () => ({
  user: [],
  categories: [],
  search: false,
});

export const mutations = {
  FETCH_ITEMS(state, categories) {
    state.categories = categories
  },
  searchToggle(state, status) {
    state.search = status
  }

};

export const actions = {
  SOCKET_newMessage(ctx, data) {
    console.log('message received', data)
  },
  fetchItems({ commit }) {
    this.$axios.get('/categories').then(res => {
      commit("FETCH_ITEMS", res.data.categories);
    })
  },
};
