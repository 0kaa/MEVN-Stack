<template>
  <v-card elevation="0">
    <nuxt-link
      :to="`/category/${_id}`"
      class="category-box text-center d-block text--primary"
    >
      <v-icon class="mb-4" x-large>{{ icon }}</v-icon>

      <h5>{{ title }}</h5>
    </nuxt-link>
  </v-card>
</template>

<script>
export default {
  name: "CategoryBox",
  props: ["icon", "title", "_id"]
};
</script>

<style lang="scss" scoped>
.theme--light {
  .category-box {
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.05);
  }
}
.category-box {
  border-radius: 5px;
  padding: 20px 10px;
}
</style>
