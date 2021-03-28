<template>
  <div>
    <v-card>
      <v-container>
        <div class="d-flex align-center">
          <nuxt-link
            to="/"
            exact-active-class
            exact
            class="logo text--primary ml-5"
          >
            <h3 class="logo-brand">هتلاقيني</h3>
          </nuxt-link>
          <search></search>
        </div>
      </v-container>
    </v-card>
    <!-- <v-toolbar class="nav-header">
      <nuxt-link to="/" exact-active-class exact class="logo text--primary">
        <h3 class="logo-brand">Logo</h3>
      </nuxt-link>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-only hidden-xs-only">
        <v-btn text depressed to="/">الرئيسية</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <create-post v-if="$store.state.token"></create-post>
      <client-only>
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
          <v-btn text @click.prevent="$store.commit('toggleLoginModal', true)"
            >تسجيل دخول</v-btn
          >
          <v-btn text @click="$store.commit('toggleRegisterModal', true)"
            >تسجيل جديد</v-btn
          >
        </div>

        <v-btn rounded icon text @click="darkMode()">
          <v-icon v-if="!$vuetify.theme.dark"> mdi-weather-night </v-icon>
          <v-icon v-else> mdi-white-balance-sunny </v-icon>
        </v-btn>
      </client-only>
    </v-toolbar> -->
    <Login v-if="$store.state.loginModal"></Login>
    <Register v-if="$store.state.registerModal"></Register>
  </div>
</template>

<script>
import cookies from "js-cookie";

export default {
  name: "Navbar",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark);
    }
  },
  beforeMount() {
    this.token = cookies.get("x-access-token");
    this.theme = localStorage.getItem("dark_theme");
    if (this.theme === "false") this.$vuetify.theme.dark = false;
    else if (this.theme === "true") this.$vuetify.theme.dark = true;
  },
  mounted() {
    if (this.token) {
      this.$store.commit("SET_TOKEN", this.token);
      this.$axios
        .get("profile", {
          headers: {
            token: this.token
          }
        })
        .then(res => {
          this.$store.commit("SET_USER", res.data);
        })
        .catch(err => {
          this.$store.dispatch("logout");
        });
    }
  },
  data() {
    return {
      login: false,
      register: false,
      token: "",
      theme: ""
    };
  }
};
</script>

<style></style>
