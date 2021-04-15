<template>
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
</template>
<script>
export default {
  name: "categories",
  props: ["categories"]
};
</script>
