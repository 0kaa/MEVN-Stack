<template>
  <div>
    <v-card max-width="600" class="mx-auto" color="transparent" elevation="0">
      <v-form
        v-model="valid"
        @submit.prevent="userLogin()"
        ref="form"
        lazy-validation
        autocomplete="off"
      >
        <v-card-title class="justify-center mb-8">تسجيل دخول</v-card-title>
        <v-card-text>
          <v-text-field
            label="البريد الالكتروني"
            autocomplete="off"
            v-model="login.email"
            :rules="rules.email"
            type="email"
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
            prepend-inner-icon="mdi-lock-outline"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="rules.password"
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
    <v-snackbar v-model="snackbar" :timeout="5000">
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

    showPassword: false,
    snackbarText: "",
    login: {
      email: "",
      password: ""
    },
    rules: {
      password: [
        v => !!v || "كلمة المرور مطلوبة",
        v => (v && v.length >= 6) || "لابد ان يكون كلمة المرور اكثر من 6 ارقام"
      ],
      email: [
        v => !!v || "البريد الالكتروني مطلوب",
        v => /.+@.+\..+/.test(v) || "يجب ان يكون البريد الاكتروني صحيح"
      ]
    }
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
        this.snackbar = true;
        this.snackbarText = err.response.data.message;
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
