<template>
  <div class="d-flex justify-center">
    <posts
      :posts="posts"
      :nextPosts="
        `posts?user=${username}&page=${$store.state.posts.currentPage + 1}`
      "
    ></posts>
  </div>
</template>

<script>
import cookies from "js-cookie";
export default {
  name: "profile",
  middleware: "auth",
  data() {
    return {
      posts: [],
      username: ""
    };
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 10000) {
      this.$fetch();
    }
  },
  async fetch() {
    try {
      this.username = cookies.get("username");
      const posts = await this.$axios
        .get(`posts?user=${this.username}`)
        .then(res => res.data);
      this.posts = posts;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style></style>
