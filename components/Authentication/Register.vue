<template>
  <div class="register modal-auth">
    <h1 class="text-center mb-5">Register</h1>
    <v-form
      v-model="valid"
      @submit.prevent="register()"
      ref="form"
      lazy-validation
    >
      <v-text-field
        label="Username"
        v-model="username"
        :rules="usernameRules"
        required
        placeholder=" "
      ></v-text-field>
      <v-text-field
        label="E-mail"
        v-model="email"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-text-field
        label="Password"
        type="password"
        v-model="password"
        :rules="passwordRules"
        required
      ></v-text-field>
      <v-btn type="submit" :disabled="!valid">Login</v-btn>
    </v-form>
    <v-snackbar shaped v-model="snackbar" :timeout="timeout">
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    snackbar: false,
    snackbarText: "",
    timeout: 5000,
    valid: true,
    username: "",
    usernameRules: [v => !!v || "username is required"],
    password: "",
    passwordRules: [v => !!v || "password is required"],
    email: "",
    emailRules: [v => !!v || "E-mail is required"]
  }),

  methods: {
    register() {
      if (this.$refs.form.validate()) {
        this.$axios
          .post("signup", {
            username: this.username,
            email: this.email,
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
