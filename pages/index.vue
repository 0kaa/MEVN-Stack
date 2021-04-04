<template>
  <div class="home-page">
    <!-- <Slider></Slider> -->
    <section class="categories">
      <v-container>
        <h2 class="section-title mb-8">الاقسام</h2>
        <v-row class="w-auto">
          <v-col
            lg=""
            cols="6"
            v-for="category in categories"
            :key="category._id"
          >
            <category-box
              :_id="category._id"
              :title="category.title"
              :icon="category.icon"
            ></category-box>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="new-added">
      <v-container>
        <h2 class="section-title mb-8">احدث الاضافات</h2>
        <v-row class="w-auto">
          <v-col lg="4" cols="6">
            <item-box></item-box>
          </v-col>
          <v-col lg="4" cols="6">
            <item-box></item-box>
          </v-col>
          <v-col lg="4" cols="6">
            <item-box></item-box>
          </v-col>
          <v-col lg="4">
            <item-box></item-box>
          </v-col>
          <v-col lg="4">
            <item-box></item-box>
          </v-col>
          <v-col lg="4">
            <item-box></item-box>
          </v-col>
          <v-col lg="4">
            <item-box></item-box>
          </v-col>
          <v-col lg="4">
            <item-box></item-box>
          </v-col>
          <v-col lg="4">
            <item-box></item-box>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>
<script>
export default {
  name: "Home",
  data: () => ({
    categories: [],
    items: []
  }),
  async asyncData({ $axios, store }) {
    const data = await $axios
      .get("/categories")
      .then(res => res.data.categories);
    const items = await $axios.get("/items").then(res => res.data.items);
    return { categories: data, items };
  }
};
</script>
