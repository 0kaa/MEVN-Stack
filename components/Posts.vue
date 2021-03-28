<template>
  <v-col cols="12" md="6">
    <v-row v-if="!posts.products">
      <v-col cols="12" md="4" v-for="i in 6" :key="i">
        <v-skeleton-loader
          :loading="true"
          v-bind="attrs"
          type="image, list-item-three-line, actions"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" v-if="!posts.products.length" class="text-center"
        >No Products</v-col
      >
      <v-col
        cols="12"
        v-for="(post, i) in posts.products"
        :key="post._id"
        :id="post._id"
      >
        <div class="post-items">
          <v-card class="mx-auto" elevation="0">
            <v-app-bar absolute flat color="transparent">
              <v-spacer></v-spacer>
              <v-menu left offset-y min-width="200">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn small icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    dense
                    @click.prevent="deleteProduct(post._id, post)"
                  >
                    <v-list-item-title>
                      <v-icon>mdi-trash-can-outline</v-icon>
                      Delete
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-app-bar>

            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img class="elevation-6" alt="" :src="post.image"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ post.user.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ post.created_at | formatDate }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-card-text class="text--primary">
              <div class="product-content">{{ post.title }}</div>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="grid">
              <v-btn
                @click.prevent="actionWithPost('like', post._id, i)"
                :color="
                  $store.state.user &&
                  post.votes.like.includes($store.state.user._id)
                    ? 'primary'
                    : ''
                "
                text
              >
                <v-icon> mdi-thumb-up-outline </v-icon>
                <h4 class="ml-2">
                  {{ post.votes.like.length || 0 }}
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
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </v-col>
</template>
<script>
export default {
  name: "Posts",
  props: ["posts", "nextPosts"],
  methods: {
    deleteProduct(id, product) {
      this.$axios
        .delete(
          `/products/${id}`,
          {},
          {
            headers: {
              token: this.$store.state.token
            }
          }
        )
        .then(res => {
          const index = this.posts.products.indexOf(product);
          this.$store.commit("deleteProduct", index);
          this.snackbar = true;
          this.snackbarText = `${product.title} ${res.data.message}`;
          // this.posts = [];
        });
    },
    setRatingPost(e, id) {
      this.$axios.post("/posts/rating", {
        user_id: this.$store.state.user._id,
        post_id: id,
        rating: e
      });
    },
    loadMorePosts() {
      this.$axios.get(this.nextPosts).then(res => {
        this.$store.commit("loadMorePosts", res.data);
        this.posts = this.$store.state.posts;
      });
    },
    actionWithPost(vote_type, post_id, index) {
      if (this.$store.state.user && this.$store.state.user.username) {
        this.loading = true;
        this.$axios
          .put("/posts/action", {
            id: post_id,
            user_id: this.$store.state.user._id,
            vote_type
          })
          .then(res => {
            this.posts.products[index].votes = res.data.votes;
            this.$store.commit("setPosts", this.posts);
          });
      }
    }
  },
  data() {
    return {
      loading: false,
      snackbarText: "",
      snackbar: false,
      timeout: 5000,
      attrs: {
        elevation: 10
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.grid {
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 20px;
}
.product-content {
  text-align: start;
  unicode-bidi: plaintext;
}
</style>
