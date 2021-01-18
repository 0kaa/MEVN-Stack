<template>
  <v-main>
    <v-container>
      <h1>Login Form</h1>
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
          required
        ></v-text-field>
        <v-text-field
          label="Password"
          type="password"
          v-model="password"
          :rules="passwordRules"
          required
        ></v-text-field>
        <v-btn type="submit" :disabled="!valid">submit</v-btn>
      </v-form>
      <v-snackbar shaped v-model="snackbar" :timeout="timeout">
        {{ snackbarText }}

        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    valid: true,
    snackbar: false,
    timeout: 5000,

    snackbarText: "",
    password: "",
    passwordRules: [v => !!v || "password is required"],
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
