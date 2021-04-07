<template>
  <div class="account">
    <v-container>
      <div class="justify-center d-flex align-center flex-column">
        <v-img
          v-if="$auth.state.user.image"
          :src="$auth.state.user.image"
          class="user-img rounded-circle"
          width="180"
          height="180"
        ></v-img>
        <v-img
          v-else
          class="user-img rounded-circle d-flex align-center mb-4 text-center text-h1 primary"
          width="180"
          height="180"
        >
          {{
            $auth.state.user.username ? $auth.state.user.username.charAt(0) : ""
          }}
        </v-img>
        <h1 class="high--dark">
          {{ $auth.state.user.username }}
        </h1>
      </div>
      <v-tabs v-model="tab" centered class="mt-8">
        <v-tabs-slider></v-tabs-slider>
        <v-tab>تعديل البيانات</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <edit-user></edit-user>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "profile",
  middleware: "auth",
  data: () => ({
    tab: null,
    colors: ["purple", "primary", "orange", "red", "grey"]
  })
};
</script>
