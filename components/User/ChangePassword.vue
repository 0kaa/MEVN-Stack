<template>
  <div class="change-password">
    <v-form
      v-model="valid"
      @submit.prevent="changePassword()"
      ref="form"
      lazy-validation
    >
      <v-text-field
        label="كلمة المرور القديمة"
        :type="showOldPassword ? 'text' : 'password'"
        v-model="old_password"
        class="mb-2"
        outlined
        prepend-inner-icon="mdi-lock-outline"
        :append-icon="showOldPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="rules.old_password"
        @click:append="showOldPassword = !showOldPassword"
        required
      ></v-text-field>
      <v-text-field
        label="كلمة المرور الجديدة"
        :type="showNewPassword ? 'text' : 'password'"
        v-model="new_password"
        class="mb-2"
        outlined
        prepend-inner-icon="mdi-lock-outline"
        :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="rules.new_password"
        @click:append="showNewPassword = !showNewPassword"
        required
      ></v-text-field>
      <v-btn
        type="submit"
        color="primary"
        block
        :disabled="!valid"
        elevation="0"
        >حفظ</v-btn
      >
    </v-form>
    <v-snackbar v-model="success" :timeout="2000" color="green">
      {{ successText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          class="v-btn--active"
          v-bind="attrs"
          @click="success = false"
          >اغلاق</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="failed" :timeout="2000" color="red">
      {{ failedText }}
      <template v-slot:action="{ attrs }">
        <v-btn text class="v-btn--active" v-bind="attrs" @click="failed = false"
          >اغلاق</v-btn
        >
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "changePassword",
  data: () => ({
    valid: true,
    success: false,
    successText: "",
    failed: false,
    failedText: "",
    showOldPassword: false,
    showNewPassword: false,
    new_password: "",
    old_password: "",
    rules: {
      old_password: [
        v => !!v || "كلمة المرور القديمة مطلوبة",
        v =>
          (v && v.length >= 6) ||
          "لابد ان يكون كلمة المرور القديمة اكثر من 6 ارقام"
      ],
      new_password: [
        v => !!v || "كلمة المرور الجديدة مطلوبة",
        v =>
          (v && v.length >= 6) ||
          "لابد ان يكون كلمة المرور الجديدة اكثر من 6 ارقام"
      ]
    }
  }),
  methods: {
    async changePassword() {
      try {
        await this.$axios
          .post(
            "/user/update/password",
            {
              new_password: this.new_password,
              old_password: this.old_password
            },
            {
              headers: {
                Authorization: this.$auth.strategy.token.get()
              }
            }
          )
          .then(res => {
            this.success = true;
            this.successText = res.data.message;
            this.$refs.form.reset();
          });
      } catch (error) {
        this.failed = true;
        this.failedText = error.response.data.message;
      }
    }
  }
};
</script>
