<template>
  <div>
    <v-card max-width="600" class="mx-auto" color="transparent" elevation="0">
      <v-form
        v-model="valid"
        @submit.prevent="userLogin()"
        ref="form"
        lazy-validation
      >
        <v-card-title class="justify-center mb-8">تسجيل دخول</v-card-title>
        <v-card-text>
          <v-text-field
            label="البريد الالكتروني"
            v-model="login.email"
            :rules="emailRules"
            outlined
            prepend-inner-icon="mdi-account-circle"
            required
          ></v-text-field>

          <v-text-field
            label="كلمة المرور"
            :type="showPassword ? 'text' : 'password'"
            v-model="login.password"
            class="mb-2"
            outlined
            prepend-inner-icon="mdi-form-textbox-password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="passwordRules"
            @click:append="showPassword = !showPassword"
            required
          ></v-text-field>

          <v-btn color="primary" text :to="{ name: 'register' }"
            >ليس لديك حساب؟</v-btn
          >
        </v-card-text>
        <v-card-actions>
          <v-btn
            type="submit"
            color="primary"
            block
            :disabled="!valid"
            elevation="0"
            >دخول</v-btn
          >
        </v-card-actions>
      </v-form>
    </v-card>
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
export default {
  data: () => ({
    valid: true,
    snackbar: false,
    timeout: 5000,
    showPassword: false,
    snackbarText: "",
    login: {
      email: "",
      password: ""
    },
    passwordRules: [v => (v && v.length >= 2) || "كلمة المرور مطلوبة"],
    emailRules: [v => !!v || "البريد الالكتروني مطلوب"]
  }),
  mounted() {
    this.$refs.form.resetValidation();
  },
  methods: {
    async userLogin() {
      try {
        if (this.$refs.form.validate()) {
          await this.$auth.loginWith("local", {
            data: this.login
          });
          this.$router.push("/");
          this.$refs.form.reset();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss">
.v-text-field .v-label {
  font-size: 12px !important;
}
</style>
