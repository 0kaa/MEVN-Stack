<template>
  <div class="d-flex justify-center">
    <posts
      :posts="posts"
      :nextPosts="`posts?page=${$store.state.posts.currentPage + 1}`"
    ></posts>
  </div>
</template>
<script>
import CreatePost from "../components/CreatePost.vue";
export default {
  components: { CreatePost },
  name: "Home",
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 10000) {
      this.$fetch();
    }
  },
  async fetch() {
    const posts = await this.$axios.get(`/posts`).then(res => res.data);
    this.posts = posts;
    this.$store.commit("setPosts", this.posts);
  },
  data() {
    return {
      posts: []
    };
  }
};
</script>
