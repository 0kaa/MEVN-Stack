<template>
  <div>
    <v-dialog v-model="$store.state.loginModal" persistent max-width="600px">
      <v-card>
        <v-form
          v-model="valid"
          @submit.prevent="login()"
          ref="form"
          lazy-validation
        >
          <v-card-title class="justify-center">User Profile</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Username"
                    v-model="username"
                    :rules="usernameRules"
                    outlined
                    prepend-inner-icon="mdi-account-circle"
                    class="mb-3"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Password"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="password"
                    outlined
                    prepend-inner-icon="mdi-form-textbox-password"
                    class="mb-3"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules"
                    @click:append="showPassword = !showPassword"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click.prevent="$store.commit('toggleLoginModal', false)"
              >Close
            </v-btn>
            <v-btn
              type="submit"
              color="primary"
              text
              :disabled="!valid"
              elevation="0"
              >Sign in</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
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
            this.$store.commit("toggleLoginModal", false);
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
