<template>
  <div>
    <v-toolbar elevation="0">
      <!-- <nuxt-link to="/" exact-active-class exact class="logo text--primary">
        <img src="/img/svg/logo.svg" alt="logo" />

        <h3 class="logo-brand">
          <span class="logo-name">{{ LogoName }}</span>
          <span class="logo-description">{{ LogoDescription }}</span>
        </h3>
      </nuxt-link> -->
      <nuxt-link
        to="/"
        exact-active-class
        exact
        class="logo text--primary ml-5"
      >
        <h3 class="logo-brand">الشعار</h3>
      </nuxt-link>

      <v-spacer></v-spacer>

      <div class="hidden-sm-only hidden-xs-only search-section">
        <!-- <v-btn nuxt text depressed to="/profile">الرئيسية</v-btn> -->
        <search></search>
      </div>

      <v-spacer></v-spacer>
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
                icon
                v-bind="attrs"
                v-on="on"
                small
                class="overflow-hidden ml-4"
              >
                <v-img
                  v-if="$auth.user.image"
                  :src="$auth.user.image"
                  alt="user profile"
                  class="user-profile"
                />
                <v-img
                  v-else
                  src="/v.png"
                  alt="user profile"
                  class="user-profile"
                />
              </v-btn>
            </template>

            <v-list>
              <v-list-item link to="/profile">
                <v-list-item-title>
                  الصفحة الشخصية
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="$auth.logout()">
                <v-list-item-title class="primary--text">
                  تسجيل خروج
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn color="primary" nuxt :to="{ name: 'ad-create' }"
            >اضافة اعلان</v-btn
          >
        </div>
        <div class="logged-out" v-else>
          <v-btn text color="primary" :to="{ name: 'login' }">تسجيل دخول</v-btn>
          <v-btn color="primary" nuxt :to="{ name: 'ad-create' }"
            >اضافة اعلان</v-btn
          >
        </div>
      </div>
      <v-btn rounded icon text @click="darkMode()">
        <v-icon v-if="!$vuetify.theme.dark"> mdi-weather-night </v-icon>
        <v-icon v-else> mdi-white-balance-sunny </v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss" scoped lang="scss"></style>
