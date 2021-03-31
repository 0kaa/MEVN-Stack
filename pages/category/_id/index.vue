<template>
  <div>{{ data.category.title }}</div>
</template>
<script>
export default {
  name: "Category",
  data: () => ({
    data: []
  }),
  async asyncData({ params, $axios }) {
    const items = await $axios.get(`/items/category/${params.id}`);
    return { data: items.data };
  }
};
</script>
<style lang=""></style>
