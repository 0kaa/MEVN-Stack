<template>
  <div class="register modal-auth">
    <v-card max-width="600px" elevation="0" color="transparent" class="mx-auto">
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
            v-model="form.username"
            :rules="rules.username"
            required
            placeholder=" "
          ></v-text-field>

          <v-text-field
            outlined
            class="mb-8"
            hide-details
            prepend-inner-icon="mdi-email"
            label="البريد الالكتروني"
            v-model="form.email"
            :rules="rules.email"
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
            v-model="form.password"
            :rules="rules.password"
            required
          ></v-text-field>
          <v-btn color="primary" text :to="{ name: 'login' }">لديك حساب؟</v-btn>
        </v-card-text>
        <v-card-actions>
          <v-btn
            type="submit"
            color="primary"
            block
            :disabled="!valid"
            elevation="0"
            >تسجيل</v-btn
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
    form: {
      username: "",
      password: "",
      email: "",
      image: ""
    },
    snackbar: false,
    snackbarText: "",
    showPassword: false,
    timeout: 5000,
    valid: true,
    rules: {
      username: [v => !!v || "username is required"],
      password: [v => !!v || "password is required"],
      email: [v => !!v || "E-mail is required"]
    }
  }),

  methods: {
    async register() {
      try {
        const formData = new FormData();

        formData.append("username", this.form.username);
        formData.append("password", this.form.password);
        formData.append("email", this.form.email);

        if (this.$refs.form.validate()) {
          await this.$axios.post("/signup", formData);
          await this.$auth.loginWith("local", {
            data: {
              email: this.form.email,
              password: this.form.password
            }
          });
          this.clear();
          this.$router.push("/");
        }
      } catch (err) {
        this.snackbar = true;
        this.snackbarText = err;
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
