<template>
  <div class="user-edit">
    <v-form
      v-model="valid"
      @submit.prevent="userEdit()"
      ref="form"
      lazy-validation
    >
      <v-img
        v-if="user.image && !imgPreview"
        :src="user.image"
        class="user-img rounded-circle mb-8"
        width="120"
        height="120"
        @click="onButtonClick"
      ></v-img>
      <v-img
        v-if="imgPreview"
        :src="imgPreview"
        class="user-img rounded-circle mb-8"
        width="120"
        height="120"
        @click="onButtonClick"
      ></v-img>

      <input
        ref="uploader"
        class="d-none"
        type="file"
        accept="image/*"
        @change="onFileChanged"
      />
      <v-text-field
        label="اسم المستخدم"
        autocomplete="off"
        v-model="user.username"
        :rules="rules.email"
        outlined
        prepend-inner-icon="mdi-account-circle"
        required
      ></v-text-field>
      <v-text-field
        label="البريد الالكتروني"
        autocomplete="off"
        v-model="user.email"
        :rules="rules.email"
        outlined
        prepend-inner-icon="mdi-account-circle"
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
  </div>
</template>
<script>
export default {
  name: "EditUser",
  data: () => ({
    valid: true,
    user: {},
    isSelecting: false,
    imgPreview: "",
    rules: {
      email: [v => !!v || "البريد الالكتروني مطلوب"]
    }
  }),
  mounted() {
    this.user = { ...this.$auth.state.user };
  },

  methods: {
    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.user.image = e.target.files[0];
      this.imgPreview = URL.createObjectURL(e.target.files[0]);
    },
    userEdit() {}
  }
};
</script>
