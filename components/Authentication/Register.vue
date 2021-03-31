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
              v-model="form.username"
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
              v-model="form.email"
              :rules="emailRules"
              required
            ></v-text-field>

            <v-file-input
              @change="upload_avatar"
              accept="image/*"
              required
              outlined
              prepend-inner-icon="mdi-email"
              :rules="imageRules"
              label="صورة المستخدم"
              show-size
            ></v-file-input>

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
    imageRules: [v => (v && v.size > 0) || "File is required"],
    timeout: 5000,
    valid: true,
    usernameRules: [v => !!v || "username is required"],
    passwordRules: [v => !!v || "password is required"],
    emailRules: [v => !!v || "E-mail is required"]
  }),

  methods: {
    upload_avatar(e) {
      this.form.image = e;
    },
    register() {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.$store.state.token}`,
          lang: this.$store.state.lang
        }
      };
      const formData = new FormData();

      formData.append("username", this.form.username);
      formData.append("password", this.form.password);
      formData.append("email", this.form.email);
      formData.append("image", this.form.image);
      if (this.$refs.form.validate()) {
        this.$axios
          .post("signup", formData)
          .then(res => {
            this.$store.dispatch("setToken", res.data);
            this.clear();
            this.$store.commit("toggleRegisterModal", false);
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
