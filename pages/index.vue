<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark v-bind="attrs" v-on="on">
          Create Post
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Post Details</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid" lazy-validation @submit.prevent="submitForm">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.author_name"
                    :counter="30"
                    :rules="nameRules"
                    label="Title"
                    required
                  ></v-text-field>
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
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "Home",
  data: () => ({
    valid: true,
    dialog: false,
    form: {
      author_name: ""
    },
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 30) || "Name must be less than 30 characters"
    ]
  }),
  mounted() {
    this.valid = false;
  },
  methods: {
    submitForm() {
      if (this.form.author_name) {
        this.$axios
          .post("posts", this.form)
          .then(res => {
            console.log(res.data);
            this.$refs.form.reset();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.valid = false;
      }
    }
  }
};
</script>
