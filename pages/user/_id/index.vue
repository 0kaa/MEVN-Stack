<template>
  <div class="user-profile">
    <v-container>
      <div class="justify-center d-flex align-center flex-column">
        <v-img
          v-if="user.image"
          :src="user.image"
          class="user-img rounded-circle"
          width="180"
          height="180"
        ></v-img>
        <v-img
          v-else
          class="user-img rounded-circle d-flex align-center mb-4 text-center primary"
          width="180"
          height="180"
        >
          {{ user.username ? user.username.charAt(0) : "" }}
        </v-img>
        <h1 class="high--dark mt-2 mb-4">
          {{ user.username }}
        </h1>
        <v-btn @click="sendMessage" color="primary">ارسل رسالة</v-btn>
      </div>
      <new-added-items :items="items" title="احدث الاضافات"></new-added-items>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "user-profile",
  async asyncData({ $axios, params, redirect, $auth, error }) {
    try {
      return await $axios.get(`/user/${params.id}`).then(res => {
        if (
          $auth.$state.loggedIn &&
          res.data.user._id === $auth.$state.user._id
        )
          return redirect("/profile");
        else return { user: res.data.user, items: res.data.items };
      });
    } catch (error) {
      return redirect("/not_found");
    }
  },
  methods: {
    sendMessage() {
      if (this.$auth.loggedIn) {
        this.$axios
          .post("/chat/conversation", {
            sender_id: this.$auth.$state.user._id,
            received_id: this.user._id
          })
          .then(res => {
            // console.log(res.data.conversation);
            this.$router.push(`/conversation/${res.data.conversation._id}`);
          });
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>
