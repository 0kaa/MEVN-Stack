<template>
  <div class="my-ads">
    <v-container>
      <div class="justify-center d-flex align-center flex-column mb-8">
        <v-img
          v-if="user.image"
          :src="user.image"
          class="user-img rounded-circle primary"
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
      </div>
      <new-added-items :items="items" title="اعلاناتي"></new-added-items>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "my-ads",
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
  async asyncData({ $axios, redirect, $auth }) {
    try {
      return await $axios.get(`/user/${$auth.$state.user._id}`).then(res => {
        if (
          !$auth.$state.loggedIn &&
          res.data.user._id !== $auth.$state.user._id
        )
          return redirect("/login");
        else return { user: res.data.user, items: res.data.items };
      });
    } catch (error) {
      return redirect("/not-found");
    }
  }
};
</script>
