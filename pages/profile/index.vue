<template>
  <v-main v-if="$store.state.user">
    <posts
      :posts="posts"
      :nextPosts="
        `posts?user=${$store.state.user.username}&page=${$store.state.posts
          .currentPage + 1}`
      "
    ></posts>
    <!-- {{ posts }} -->
  </v-main>
</template>

<script>
export default {
  name: "profile",
  middleware: "auth",
  data() {
    return {
      posts: []
    };
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  async fetch() {
    try {
      const posts = await this.$axios
        .get(`posts?user=${this.$store.state.user.username}`)
        .then(res => res.data);
      this.posts = posts;
    } catch (error) {
      console.log(error);
    }
  }
};
</script>

<style></style>
