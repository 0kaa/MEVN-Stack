<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" v-bind="attrs" v-on="on" class="mr-2">
        Add New Post
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Post Details</span>
      </v-card-title>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="submitForm"
        >
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.author_name"
                  :rules="nameRules"
                  label="Title"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-file-input
                  @change="upload_avatar"
                  accept="image/*"
                  required
                  :rules="imageRules"
                  label="File input"
                  show-size
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          :disabled="!valid"
          @click="submitForm"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
  </v-dialog>
</template>
<script>
export default {
  name: "CreatePost",

  data() {
    return {
      valid: true,
      snackbarText: "",
      snackbar: false,
      timeout: 5000,
      dialog: false,
      form: {
        author_name: "",
        image: "",
        user: this.$store.state.user._id,
        created_at: new Date()
      },
      nameRules: [v => !!v || "Name is required"],
      imageRules: [v => (v && v.size > 0) || "File is required"]
    };
  },
  mounted() {
    this.valid = false;
  },
  created() {
    setInterval(this.updateDate, 1000);
  },
  methods: {
    upload_avatar(e) {
      this.form.image = e;
    },
    updateDate() {
      this.form.created_at = new Date();
    },
    submitForm() {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${this.$store.state.token}`,
          lang: this.$store.state.lang
        }
      };
      const formData = new FormData();
      //       image: this.form.image,
      // title: this.form.author_name,
      // user: this.$store.state.user._id,
      // created_at: new Date()
      formData.append("title", this.form.author_name);
      formData.append("image", this.form.image);
      formData.append("user", this.$store.state.user._id);
      formData.append("created_at", new Date());
      if (this.form.author_name) {
        this.$axios
          .post("products", formData, config)
          .then(res => {
            console.log(res);
            this.$store.commit("pushPosts", res.data);
            this.$refs.form.reset();
            this.dialog = false;
          })
          .catch(err => {
            console.log(err.response.data.message);
            if (err) {
              this.snackbar = true;
              this.snackbarText = err.response.data.message;
            }
          });
      } else {
        this.valid = false;
      }
    }
  }
};
</script>
<style lang=""></style>
