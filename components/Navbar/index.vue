<template>
  <div>
    <v-toolbar elevation="0">
      <nuxt-link
        to="/"
        exact-active-class
        exact
        class="logo text--primary ml-5"
      >
        <h3 class="logo-brand primary--text">هتلاقيني</h3>
      </nuxt-link>
      <v-spacer></v-spacer>
      <div class="hidden-sm-only hidden-xs-only search-section">
        <search :searchNav="true"></search>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        fab
        small
        class="ml-2 hidden-md-and-up v-btn--active"
        depressed
        @click="$store.commit('searchToggle', true)"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <div class="sign">
        <div class="logged-in" v-if="$auth.$state.loggedIn">
          <v-menu
            open-on-hover
            offset-y
            bottom
            transition="slide-y-transition"
            rounded="0"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                fab
                v-bind="attrs"
                v-on="on"
                small
                class="overflow-hidden ml-4"
                to="/profile"
              >
                <v-img
                  v-if="$auth.user.image"
                  :src="$auth.user.image"
                  alt="user profile"
                  class="user-profile"
                />
                <v-img
                  v-else
                  class="d-flex align-center text-center primary"
                  width="50"
                  height="50"
                >
                  {{
                    $auth.$state.user.username
                      ? $auth.$state.user.username.charAt(0).toUpperCase()
                      : ""
                  }}
                </v-img>
              </v-btn>
            </template>

            <v-list>
              <v-list-item link to="/profile">
                <v-list-item-title>
                  الصفحة الشخصية
                </v-list-item-title>
              </v-list-item>
              <v-list-item link :to="{ name: 'conversations' }">
                <v-list-item-title>
                  المحادثات
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="$auth.logout()">
                <v-list-item-title class="primary--text">
                  تسجيل خروج
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            color="primary"
            nuxt
            :to="{ name: 'ad-create' }"
            class="hidden-sm-and-down"
            >اضافة اعلان</v-btn
          >
        </div>
        <div class="logged-out" v-else>
          <v-btn text color="primary" :to="{ name: 'login' }">تسجيل دخول</v-btn>
          <v-btn
            color="primary"
            nuxt
            :to="{ name: 'ad-create' }"
            class="hidden-sm-and-down"
            >اضافة اعلان</v-btn
          >
        </div>
      </div>
    </v-toolbar>
    <v-btn
      color="primary hidden-md-and-up"
      fixed
      bottom
      right
      fab
      app
      :to="{ name: 'ad-create' }"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <search-modal v-if="$store.state.search"></search-modal>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss" scoped lang="scss"></style>
