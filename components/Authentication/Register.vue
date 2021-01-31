<template>
  <div class="register modal-auth">
    <v-dialog v-model="$store.state.registerModal" persistent max-width="600px">
      <v-card>
        <v-form
          v-model="valid"
          @submit.prevent.stop="register()"
          ref="form"
          lazy-validation
        >
          <v-card-title class="justify-center">Register Form</v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    prepend-inner-icon="mdi-account-circle"
                    label="Username"
                    v-model="username"
                    :rules="usernameRules"
                    required
                    placeholder=" "
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    outlined
                    prepend-inner-icon="mdi-email"
                    label="E-mail"
                    v-model="email"
                    :rules="emailRules"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    :type="showPassword ? 'text' : 'password'"
                    outlined
                    prepend-inner-icon="mdi-form-textbox-password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    label="Password"
                    v-model="password"
                    :rules="passwordRules"
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
              @click.prevent="$store.commit('toggleRegisterModal', false)"
            >
              Close
            </v-btn>
            <v-btn
              type="submit"
              color="primary"
              text
              :disabled="!valid"
              elevation="0"
              >Sign Up</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    snackbar: false,
    snackbarText: "",
    showPassword: false,

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
            this.$store.commit("toggleRegisterModal", false);
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
