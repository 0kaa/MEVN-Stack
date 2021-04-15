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
            v-model="form.username"
            :rules="rules.username"
            required
            placeholder=" "
          ></v-text-field>

          <v-text-field
            outlined
            type="email"
            prepend-inner-icon="mdi-email"
            label="البريد الالكتروني"
            v-model="form.email"
            :rules="rules.email"
            required
          ></v-text-field>

          <v-text-field
            :type="showPassword ? 'text' : 'password'"
            outlined
            prepend-inner-icon="mdi-lock-outline"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            label="كلمة المرور"
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
    <v-snackbar v-model="snackbar" :timeout="5000" color="red">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          class="v-btn--active"
          text
          v-bind="attrs"
          @click="snackbar = false"
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
    showPassword: false,
    valid: true,
    snackbar: false,
    snackbarText: "",
    rules: {
      username: [v => !!v || "اسم المستخدم مطلوب"],
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

  methods: {
    async register() {
      try {
        if (this.$refs.form.validate()) {
          await this.$axios.post("/signup", this.form);
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
        this.snackbarText = err.response.data.message;
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>
