<template>
  <v-app>
    <Navbar></Navbar>
    <v-main class="mt-5">
        <nuxt keep-alive />
    </v-main>
  </v-app>
</template>

<script>
import cookies from "js-cookie";
export default {
  name: "Default",
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 10000) {
      this.$fetch();
    }
  },
  async fetch() {
    const token = cookies.get("x-access-token");
    if (token) {
      this.$store.commit("SET_TOKEN", token);
      this.$axios
        .get("profile", {
          headers: {
            token: token
          }
        })
        .then(res => {
          this.$store.commit("SET_USER", res.data);
        })
        .catch(err => {
          this.$store.dispatch("logout");
        });
    }
  }
};
</script>
