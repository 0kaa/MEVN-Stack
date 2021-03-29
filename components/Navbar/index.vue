<template>
  <div>
    <v-card>
      <v-container>
        <div
          class="top-nav mb-4 d-flex align-center justify-space-between flex-wrap"
        >
          <div class="d-flex align-center">
            <nuxt-link
              to="/"
              exact-active-class
              exact
              class="logo text--primary ml-5"
            >
              <h3 class="logo-brand">الشعار</h3>
            </nuxt-link>
            <!-- <v-btn @click="darkMode">dark</v-btn> -->
            <search></search>
          </div>
          <div class="sign">
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
              <v-btn
                text
                color="primary"
                @click.prevent="$store.commit('toggleLoginModal', true)"
                >تسجيل دخول</v-btn
              >
              <v-btn tile color="primary">اضافة اعلان</v-btn>
            </div>
          </div>
        </div>
        <div class="bottom-nav">
          <ul class="d-flex">
            <li
              v-for="category in $store.state.categories"
              :key="category._id"
              class="ml-8"
            >
              {{ category.title }}
            </li>
          </ul>
        </div>
      </v-container>
    </v-card>
    <Login v-if="$store.state.loginModal"></Login>
    <Register v-if="$store.state.registerModal"></Register>
  </div>
</template>

<script src="./script.js"></script>

<style src="./style.scss" scoped lang="scss"></style>
