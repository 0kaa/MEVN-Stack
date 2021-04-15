<template>
  <div>
    <categories :categories="$store.state.categories"></categories>
    <new-added-items
      :items="data.items"
      :title="data.category.title"
    ></new-added-items>
  </div>
</template>
<script>
export default {
  name: "category",
  async asyncData({ params, $axios }) {
    const items = await $axios.get(`/items/category/${params.id}`);
    return { data: items.data };
  },
  data: () => ({
    data: []
  })
};
</script>
<style lang=""></style>
