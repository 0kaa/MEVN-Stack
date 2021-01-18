<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed app temporary>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar elevation="2" class="nav-header">
      <nuxt-link to="/" exact-active-class exact class="logo text--primary">
        <h3 class="logo-brand">Logo</h3>
      </nuxt-link>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-only hidden-xs-only">
        <v-btn nuxt text depressed to="/">Home</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <div class="logged-in" v-if="$store.state.token">
        <v-menu
          open-on-hover
          offset-y
          bottom
          transition="slide-y-transition"
          rounded="0"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              {{ $store.state.user.username }}
            </v-btn>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title>
                <v-btn text router to="/profile">Settings</v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-btn text @click="logout">Log Out</v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="logged-out" v-else>
        <v-btn text router to="/login">Login</v-btn>
        <v-btn text router to="/register">Register</v-btn>
      </div>
      <v-btn rounded icon text @click="darkMode()">
        <v-icon v-if="!$vuetify.theme.dark"> mdi-weather-night </v-icon>
        <v-icon v-else> mdi-white-balance-sunny </v-icon>
      </v-btn>
      <v-app-bar-nav-icon
        class="hidden-md-only hidden-md-and-up"
        @click.stop="drawer = !drawer"
      >
      </v-app-bar-nav-icon>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    }
  },
  // created() {
  //   const token = cookies.get("x-access-token");
  //   if (token) {
  //     this.$store.commit("SET_TOKEN", token);
  //     this.$axios
  //       .get("profile", {
  //         headers: {
  //           token: token
  //         }
  //       })
  //       .then(res => {
  //         this.$store.commit("SET_USER", res.data);
  //       });
  //   }
  // },
  data() {
    return {
      drawer: false,
      offset: true,
      items: [
        {
          icon: "mdi-apps",
          title: "Login",
          to: "/"
        },
        {
          icon: "mdi-apps",
          title: "Register",
          to: "/register"
        }
      ]
    };
  }
};
</script>

<style></style>
