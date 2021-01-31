<template>
  <v-col cols="12" md="6">
    <v-row v-if="!posts.posts">
      <v-col cols="12" md="4" v-for="i in 6" :key="i">
        <v-skeleton-loader
          :loading="true"
          v-bind="attrs"
          type="image, list-item-three-line, actions"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" v-for="(post, i) in posts.posts" :key="post._id">
        <div class="post-items">
          <v-card class="mx-auto darken-5" elevation="0">
            <v-app-bar absolute flat color="transparent">
              <v-spacer></v-spacer>

              <v-btn color="white" small icon>
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </v-app-bar>

            <v-list-item class="grow">
              <v-list-item-avatar color="grey darken-3">
                <v-img
                  class="elevation-6"
                  alt=""
                  src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                ></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{ post.user }}</v-list-item-title>
                <v-list-item-subtitle>
                  {{ post.created_at | formatDate }}</v-list-item-subtitle
                >
              </v-list-item-content>
            </v-list-item>

            <v-card-text class="text--primary">
              <div>{{ post.author_name }}</div>
            </v-card-text>
            <v-rating
              v-model="post.avgRating"
              readonly
              length="5"
              color="orange"
              background-color="grey lighten-1"
              hover
              @input="setRatingPost($event, post._id)"
            ></v-rating>
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
  </v-col>
</template>
<script>
export default {
  name: "Posts",
  props: ["posts", "nextPosts"],
  methods: {
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
            this.posts.posts[index].votes = res.data.votes;
            this.$store.commit("setPosts", this.posts);
          });
      }
    }
  },
  data() {
    return {
      loading: false,
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
</style>
