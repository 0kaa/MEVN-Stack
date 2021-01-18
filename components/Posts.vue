<template>
  <v-col cols="12" md="10">
    <v-row>
      <v-col cols="12" md="4" v-for="i in 6" :key="i">
        <v-skeleton-loader
          v-if="!posts.posts"
          :loading="true"
          v-bind="attrs"
          type="image, list-item-three-line, actions"
        ></v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="4" v-for="post in posts.posts" :key="post._id">
        <div class="post-items">
          <v-card class="mx-auto" max-width="400">
            <v-app-bar absolute flat color="transparent">
              <v-spacer></v-spacer>

              <v-btn color="white" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-app-bar>
            <v-img
              height="300px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
            </v-img>
            <v-card-title>{{ post.user }}</v-card-title>
            <v-card-subtitle class="pb-0">
              {{ post.created_at | formatDate }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ post.author_name }}</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" text>
                <v-icon> mdi-thumb-up-outline </v-icon>
                <h4 class="ml-2">
                  {{ post.like || 0 }}
                </h4>
              </v-btn>

              <v-btn color="red" text>
                <v-icon> mdi-thumb-down-outline </v-icon>
                <h4 class="ml-2">
                  {{ post.dislike || 0 }}
                </h4>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-row
      justify="center"
      class="mt-5"
      v-if="
        nextPosts &&
          $store.state.posts.totalPages > 0 &&
          $store.state.posts.totalPages !== $store.state.posts.currentPage
      "
    >
      <v-btn @click="loadMorePosts">Load More</v-btn>
    </v-row>
  </v-col>
</template>
<script>
export default {
  name: "Posts",
  props: ["posts", "nextPosts"],
  methods: {
    loadMorePosts() {
      this.$axios.get(this.nextPosts).then(res => {
        this.$store.commit("loadMorePosts", res.data);
        this.posts = this.$store.state.posts;
      });
    }
  },
  data() {
    return {
      attrs: {
        elevation: 10
      }
    };
  }
};
</script>
