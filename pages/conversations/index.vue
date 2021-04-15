<template>
  <div class="conversations">
    <v-container>
      <conversations-component
        :conversations="conversations"
      ></conversations-component>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "conversations",
  middleware: "auth",
  data: () => ({
    conversations: []
  }),
  async asyncData({ $axios, $auth, redirect }) {
    try {
      if ($auth.loggedIn) {
        return await $axios
          .get(
            "/chat/conversations",
            {},
            {
              headers: {
                Authorization: $auth.strategy.token.get()
              }
            }
          )
          .then(res => {
            return { conversations: res.data.conversations };
          });
      } else {
        return redirect("/not-found");
      }
    } catch (error) {
      console.log(error);
      return redirect("/not-found");
    }
  }
};
</script>
