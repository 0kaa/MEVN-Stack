<template>
  <div class="search">
    <div class="d-flex align-center">
      <div class="h-search">
        <v-row class="align-center">
          <v-col sm="7">
            <v-text-field
              v-model="firstname"
              filled
              flat
              background-color="transparent"
              solo
              dense
              placeholder="ابحث عن اي شيئ .."
              required
              hide-details
            ></v-text-field>
          </v-col>
          <v-col sm="1">
            <div class="border"></div>
          </v-col>
          <v-col sm="4">
            <v-select
              filled
              flat
              background-color="transparent"
              solo
              dense
              single-line
              :menu-props="{ offsetY: true }"
              :items="items"
              v-model="select"
              no-data-text="لا يوجد بيانات حالية"
              placeholder="كل الاقسام"
              hide-details
              required
            ></v-select>
          </v-col>
        </v-row>
        <!-- <v-autocomplete
          v-model="model"
          :items="items"
          :search-input.sync="search"
          color="transparent"
          filled
          flat
          light
          background-color="transparent"
          single-line
          solo
          dense
          item-text="title"
          hide-details
          cache-items
          item-value="title"
          return-object
          placeholder="ابحث عن اي شيئ .."
        ></v-autocomplete> -->
      </div>
      <v-btn height="50" tile color="primary">
        <v-icon>mdi-search-web</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null,
    items: [
      { text: "State 1" },
      { text: "State 2" },
      { text: "State 3" },
      { text: "State 4" },
      { text: "State 5" },
      { text: "State 6" },
      { text: "State 7" }
    ]
  }),

  computed: {
    fields() {
      if (!this.model) return [];

      return Object.keys(this.model).map(key => {
        return {
          key,
          value: this.model[key] || "n/a"
        };
      });
    },
    items() {
      return this.entries;
    }
  },

  watch: {
    search(val, oldval) {
      console.log(val);
      console.log(oldval);
      // Lazily load input items
      // fetch(`http://127.0.0.1:5000/categories?query=${val}`)
      //   .then(res => res.json())
      //   .then(res => {
      //     const { count, categories } = res;
      //     this.entries = categories;
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  }
};
</script>

<style lang="scss" scoped>
.h-search {
  border: 1px solid #dedede;
  padding: 4px 0;
  box-shadow: 0 0 6px hsl(0deg 0% 0% / 16%);
  display: flex;
  align-items: center;
  .border {
    width: 2px;
    min-height: 30px;
    max-height: 30px;
    background: #cccccc;
  }
}
</style>
