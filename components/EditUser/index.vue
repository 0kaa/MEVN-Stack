<template>
  <div class="user-edit">
    <v-form
      v-model="valid"
      @submit.prevent="userEdit()"
      ref="form"
      lazy-validation
    >
      <v-label @click="onButtonClick">الصورة الشخصية</v-label>
      <v-img
        v-if="user.image && !imgPreview"
        :src="user.image"
        class="user-img rounded-circle mb-8 mt-4"
        width="120"
        height="120"
        @click="onButtonClick"
      ></v-img>
      <v-img
        v-if="imgPreview"
        :src="imgPreview"
        class="user-img rounded-circle mb-8 mt-4"
        width="120"
        height="120"
        @click="onButtonClick"
      ></v-img>
      <v-btn
        v-if="!imgPreview && !user.image"
        :loading="isSelecting"
        block
        class="mb-8 mt-4"
        @click="onButtonClick"
      >
        <v-icon left> mdi-cloud-upload </v-icon>
        {{ buttonText }}
      </v-btn>
      <input
        ref="uploader"
        class="d-none"
        type="file"
        accept="image/png,image/jpg,image/jpeg"
        @change="onFileChanged"
      />
      <v-text-field
        label="اسم المستخدم"
        autocomplete="off"
        v-model="user.username"
        :rules="rules.email"
        :counter="30"
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
    <v-snackbar v-model="snackbar" :timeout="2000" color="green">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar = false">اغلاق</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: "EditUser",
  data: () => ({
    valid: true,
    user: {},
    snackbar: false,
    snackbarText: "",
    isSelecting: false,
    imgPreview: "",
    rules: {
      email: [
        v => !!v || "اسم المستخدم مطلوبو",
        v => (v && v.length >= 3) || "اسم المستخدم لابد ان يكون اكثر من 3 حروف",
        v => (v && v.length <= 30) || "اسم المستخدم لا يمكن ان يزيد عن 30 حرف"
      ]
    }
  }),
  computed: {
    buttonText() {
      return this.selectedFile
        ? this.selectedFile.name
        : this.defaultButtonText;
    }
  },

  async fetch() {
    await this.$auth.fetchUser();
    this.user = { ...this.$auth.$state.user };
  },
  activated() {
    this.$fetch();
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
      if (this.user.image)
        this.imgPreview = URL.createObjectURL(e.target.files[0]);
      else this.imgPreview = "";
    },
    async userEdit() {
      try {
        const formData = new FormData();

        formData.append("image", this.user.image);
        formData.append("username", this.user.username);
        await this.$axios
          .post("/user/update", formData, {
            headers: {
              Authorization: this.$auth.strategy.token.get()
            }
          })
          .then(() => {
            this.$fetch();
            this.snackbar = true;
            this.snackbarText = "تم تغير البيانات بنجاح";
          });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.user-img {
  cursor: pointer;
}
</style>
