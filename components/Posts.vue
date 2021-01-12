<template>
  <v-col cols="12" md="10">
    <v-row>
      <v-col cols="12" md="4" v-for="post in posts.posts" :key="post._id">
        <v-skeleton-loader
          v-if="!posts.posts.length"
          :loading="true"
          v-bind="attrs"
          type="image, list-item-three-line, actions"
        ></v-skeleton-loader>
        <div class="post-items" v-else>
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
            <v-card-title>{{ post.author_name }}</v-card-title>
            <v-card-subtitle class="pb-0">
              {{ post.created_at | formatDate }}
            </v-card-subtitle>

            <v-card-text class="text--primary">
              <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>

            <v-card-actions>
              <v-btn color="primary" text>
                <v-icon>
                  mdi-thumb-up-outline
                </v-icon>
                <h4 class="ml-2">
                  {{ post.like || 0 }}
                </h4>
              </v-btn>

              <v-btn color="red" text>
                <v-icon>
                  mdi-thumb-down-outline
                </v-icon>
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
      v-if="
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

  async fetch() {
    this.mutations = await this.$axios.get("posts").then(res => {
      this.$store.commit("setPosts", res.data);
      this.posts = this.$store.state.posts;
    });
  },
  methods: {
    loadMorePosts() {
      this.$axios
        .get(`posts?page=${this.$store.state.posts.currentPage + 1}`)
        .then(res => {
          this.$store.commit("loadMorePosts", res.data);
          this.posts = this.$store.state.posts;
        });
    }
  },
  data() {
    return {
      attrs: {
        elevation: 10
      },
      posts: []
    };
  }
};
</script>
