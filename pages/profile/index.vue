<template>
  <div class="account">
    <v-card max-width="600px" elevation="0" color="transparent" class="mx-auto">
      <v-container>
        <div class="justify-center d-flex align-center flex-column">
          <v-img
            v-if="$auth.$state.user.image"
            :src="$auth.$state.user.image"
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
            {{
              $auth.$state.user.username
                ? $auth.$state.user.username.charAt(0).toUpperCase()
                : ""
            }}
          </v-img>
          <h1 class="high--dark">
            {{ $auth.$state.user.username }}
          </h1>
        </div>
        <v-tabs v-model="tab" centered class="mt-8">
          <v-tabs-slider></v-tabs-slider>
          <v-tab>المظهر</v-tab>
          <v-tab>تعديل البيانات</v-tab>
          <v-tab>تغيير كلمة المرور</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-switch
                  v-model="dark"
                  :ripple="false"
                  inset
                  @change="darkMode()"
                  label="الوضع الليلي"
                ></v-switch>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <edit-user></edit-user>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <change-password></change-password>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "profile",
  middleware: "auth",
  computed: {
    dark() {
      return this.$vuetify.theme.dark;
    }
  },
  data: () => ({
    tab: null,
    colors: ["purple", "primary", "orange", "red", "grey"]
  }),
  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark);
    }
  }
};
</script>

<style scoped>
.user-img {
  font-size: 40px;
  font-weight: bold;
}
</style>
