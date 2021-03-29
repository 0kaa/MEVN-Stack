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
          <v-card-title class="justify-center mb-8">تسجيل جديد</v-card-title>
          <v-card-text>
            <v-text-field
              outlined
              prepend-inner-icon="mdi-account-circle"
              label="اسم المستخدم"
              class="mb-8"
              hide-details
              v-model="username"
              :rules="usernameRules"
              required
              placeholder=" "
            ></v-text-field>

            <v-text-field
              outlined
              class="mb-8"
              hide-details
              prepend-inner-icon="mdi-email"
              label="البريد الالكتروني"
              v-model="email"
              :rules="emailRules"
              required
            ></v-text-field>

            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              outlined
              prepend-inner-icon="mdi-form-textbox-password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              label="كلمة المرور"
              class="mb-8"
              hide-details
              v-model="password"
              :rules="passwordRules"
              required
            ></v-text-field>
            <v-btn
              color="primary"
              text
              @click.prevent="
                $store.commit('toggleRegisterModal', false);
                $store.commit('toggleLoginModal', true);
              "
              >لديك حساب؟</v-btn
            >
          </v-card-text>
          <v-card-actions>
            <v-btn
              type="submit"
              color="primary"
              :disabled="!valid"
              elevation="0"
              >تسجيل</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click.prevent="$store.commit('toggleRegisterModal', false)"
            >
              اغلاق
            </v-btn>
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
