<template>
  <div class="dialog-content blur">
    <div
      class="login modal-auth"
      :class="$vuetify.theme.dark ? 'dark' : 'light'"
    >
      <div>
        <v-spacer></v-spacer>
        <v-btn elevation="20" x-small icon class="close-icon"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </div>
      <header>
        <h1 class="text-center text-h5 mt-5 mb-5">Login Form</h1>
      </header>
      <v-form
        v-model="valid"
        @submit.prevent="login()"
        ref="form"
        lazy-validation
      >
        <v-text-field
          label="Username"
          v-model="username"
          :rules="usernameRules"
          outlined
          dense
          prepend-inner-icon="mdi-account-circle"
          class="mb-3"
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          outlined
          dense
          prepend-inner-icon="mdi-form-textbox-password"
          class="mb-3"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          @click:append="showPassword = !showPassword"
          required
        ></v-text-field>
        <v-btn
          type="submit"
          block
          color="primary"
          :disabled="!valid"
          elevation="0"
          class="mb-5"
          >Sign in</v-btn
        >
      </v-form>
      <v-snackbar v-model="snackbar" :timeout="timeout">
        {{ snackbarText }}

        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["dialog"],
  data: () => ({
    valid: true,
    snackbar: false,
    timeout: 5000,
    showPassword: false,
    snackbarText: "",
    password: "",
    passwordRules: [v => !!v || "Password is required"],
    username: "",
    usernameRules: [v => !!v || "Username is required"]
  }),

  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.$axios
          .post("login", {
            username: this.username,
            password: this.password
          })
          .then(res => {
            this.$store.dispatch("setToken", res.data);
            this.clear();
            this.$router.push("/");
          })
          .catch(err => {
            if (err) {
              this.snackbar = true;
              this.snackbarText = err.response.data.msg;
            }
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
