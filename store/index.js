export const state = () => ({
  posts: []
});

export const mutations = {
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
    state.posts.totalPages = data.totalpages;
    state.posts.currentPage = data.currentPage;
  }
};
