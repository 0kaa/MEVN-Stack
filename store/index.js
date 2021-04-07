import cookies from "js-cookie";

export const state = () => ({
  user: [],
  categories: []
});

export const mutations = {
  FETCH_ITEMS(state, categories) {
    state.categories = categories
  },

};

export const actions = {
  fetchItems({ commit }) {
    this.$axios.get('/categories').then(res => {
      commit("FETCH_ITEMS", res.data.categories);
    })
  },
};
