<template>
  <v-row justify="center">
    <create-post></create-post>
    <posts
      :posts="posts"
      :nextPosts="`posts?page=${$store.state.posts.currentPage + 1}`"
    ></posts>
  </v-row>
</template>
<script>
import CreatePost from "../components/CreatePost.vue";
export default {
  components: { CreatePost },
  name: "Home",

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
