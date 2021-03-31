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
          <v-card-title class="justify-center mb-8">تسجيل دخول</v-card-title>
          <v-card-text>
            <v-text-field
              label="البريد الالكتروني"
              v-model="email"
              :rules="emailRules"
              outlined
              prepend-inner-icon="mdi-account-circle"
              required
            ></v-text-field>

            <v-text-field
              label="كلمة المرور"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="mb-2"
              outlined
              prepend-inner-icon="mdi-form-textbox-password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              @click:append="showPassword = !showPassword"
              required
            ></v-text-field>

            <v-btn
              color="primary"
              text
              @click.prevent="
                $store.commit('toggleLoginModal', false);
                $store.commit('toggleRegisterModal', true);
              "
              >ليس لديك حساب؟</v-btn
            >
          </v-card-text>
          <v-card-actions>
            <v-btn
              type="submit"
              color="primary"
              :disabled="!valid"
              elevation="0"
              >دخول</v-btn
            >
            <v-btn
              color="primary"
              text
              @click.prevent="$store.commit('toggleLoginModal', false)"
              >اغلاق
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false"
          >اغلاق</v-btn
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
    passwordRules: [v => !!v || "كلمة المرور مطلوبة"],
    email: "",
    emailRules: [v => !!v || "البريد الالكتروني مطلوب"]
  }),

  methods: {
    login() {
      if (this.$refs.form.validate()) {
        this.$axios
          .post("login", {
            email: this.email,
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
              this.snackbarText = err.response.data.message;
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

<style lang="scss">
.v-text-field .v-label {
  font-size: 12px !important;
}
</style>
