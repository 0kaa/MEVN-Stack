<template>
  <div class="ad-component">
    <v-card max-width="600px" elevation="0" color="transparent" class="mx-auto">
      <v-form
        v-model="valid"
        v-on="
          !mode ? { submit: e => CreateAd(e) } : { submit: e => updateAd(e) }
        "
        ref="form"
        lazy-validation
      >
        <v-card-title class="justify-center mb-8 pt-0">
          {{ mode ? "تعديل الاعلان" : "اضافة اعلان" }}
        </v-card-title>
        <v-card-text>
          <v-text-field
            outlined
            label="العنوان"
            v-model="ad.title"
            :rules="rules.title"
            :counter="30"
            required
          ></v-text-field>
          <v-textarea
            outlined
            label="الوصف"
            :rules="rules.description"
            v-model="ad.description"
            :counter="120"
            required
          ></v-textarea>
          <v-img
            v-if="mode && data.image && !selectedFile"
            :src="data.image"
            @click="onButtonClick"
            :aspect-ratio="16 / 8"
          ></v-img>
          <v-btn
            v-if="!mode || selectedFile"
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
            accept="image/*"
            @change="onFileChanged"
          />
          <v-radio-group row v-model="ad.type" mandatory>
            <v-radio label="مفقود" value="60605e6adba3e9260492c4c7"></v-radio>
            <v-radio label="معثور" value="6069c4e904286d4ad46896e8"></v-radio>
          </v-radio-group>
          <v-select
            clearable
            :rules="rules.category"
            label="كل الاقسام"
            :menu-props="{ offsetY: true }"
            :items="$store.state.categories"
            item-text="title"
            item-value="_id"
            outlined
            v-model="ad.category"
            no-data-text="لا يوجد بيانات حالية"
          >
          </v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn
            type="submit"
            color="primary"
            block
            :disabled="!valid"
            elevation="0"
          >
            {{ mode ? "تعديل" : "اضافة" }}
          </v-btn>
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
  name: "ad",
  props: {
    mode: {
      type: Boolean,
      default: false
    },
    data: Object
  },
  computed: {
    buttonText() {
      return this.selectedFile
        ? this.selectedFile.name
        : this.defaultButtonText;
    }
  },
  mounted() {
    if (this.mode) {
      this.ad = this.data;
    }
  },
  data: () => ({
    defaultButtonText: "الصورة",
    selectedFile: "",
    isSelecting: false,
    rules: {
      title: [
        v => !!v || "العنوان مطلوب",
        v => (v && v.length >= 3) || "العنوان لابد ان يكون اكثر من 3 حروف",
        v => (v && v.length <= 30) || "العنوان لا يمكن ان يزيد عن 30 حرف"
      ],
      description: [
        v => !!v || "الوصف مطلوب",
        v => (v && v.length >= 3) || "الوصف لا يمكن ان يكون اقل من 3 حروف",
        v => (v && v.length <= 120) || "الوصف لا يمكن ان يزيد عن 120 حرف"
      ],
      category: [v => !!v || "القسم مطلوب"]
    },
    ad: {
      title: "",
      description: "",
      category: "",
      type: "",
      image: ""
    },
    snackbar: false,
    snackbarText: "",
    timeout: 5000,
    valid: true
  }),
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
      this.selectedFile = e.target.files[0];
    },
    upload_avatar(e) {
      this.form.image = e;
    },
    async CreateAd(e) {
      e.preventDefault();
      try {
        const formData = new FormData();

        const config = {
          headers: {
            Authorization: this.$auth.strategy.token.get()
          }
        };
        formData.append("title", this.ad.title);
        formData.append("description", this.ad.description);
        formData.append("user", this.$auth.$state.user._id);
        formData.append("category", this.ad.category);
        formData.append("image", this.selectedFile);
        formData.append("type", this.ad.type);

        if (this.$refs.form.validate()) {
          await this.$axios.post("/items", formData, config);
          this.$router.push("/");
          this.selectedFile = "";
          this.$refs.form.reset();
        }
      } catch (err) {
        this.snackbar = true;
        if (err.response.data.errors.image) {
          this.snackbarText = err.response.data.errors.image.message;
        } else {
          this.snackbarText = err.message;
        }
      }
    },
    async updateAd(e) {
      e.preventDefault();
      try {
        const formData = new FormData();

        const config = {
          headers: {
            _id: this.data._id,
            Authorization: this.$auth.strategy.token.get()
          }
        };
        formData.append("title", this.ad.title);
        formData.append("description", this.ad.description);
        formData.append("user", this.$auth.$state.user._id);
        formData.append("category", this.ad.category);
        if (this.selectedFile) {
          formData.append("image", this.selectedFile);
        } else {
          formData.append("image", this.ad.image);
        }
        formData.append("type", this.ad.type);
        if (this.$refs.form.validate()) {
          await this.$axios.post(`/items/${this.data._id}`, formData, config);
          this.$router.push("/");
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
