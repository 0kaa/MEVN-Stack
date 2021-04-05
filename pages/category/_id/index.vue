<template>
  <div>
    <categories :categories="categories"></categories>
    <new-added-items
      :items="data.items"
      :title="data.category.title"
    ></new-added-items>
  </div>
</template>
<script>
export default {
  name: "Category",
  async asyncData({ params, $axios }) {
    const items = await $axios.get(`/items/category/${params.id}`);

    return { data: items.data };
  },
  data: () => ({
    data: [],
    categories: []
  }),
  async fetch() {
    this.categories = await this.$axios
      .get("/categories")
      .then(res => res.data.categories);
  },
  activated() {
    // Call fetch again if last fetch more than a minute ago
    if (this.$fetchState.timestamp <= Date.now() - 60000) {
      this.$fetch();
    }
  }
};
</script>
<style lang=""></style>
