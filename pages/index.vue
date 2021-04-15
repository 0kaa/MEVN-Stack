<template>
  <div class="home-page">
    <categories :categories="categories"></categories>
    <new-added-items :items="items" title="احدث الاضافات"></new-added-items>
  </div>
</template>
<script>
export default {
  name: "home",
  data: () => ({
    categories: [],
    items: []
  }),

  async asyncData({ $axios }) {
    const data = await $axios
      .get("/categories")
      .then(res => res.data.categories);
    const items = await $axios.get("/items").then(res => res.data.items);
    return { categories: data, items };
  }
};
</script>
