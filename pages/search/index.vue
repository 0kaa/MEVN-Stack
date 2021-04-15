<template>
  <div class="search-page">
    <new-added-items :items="items" title="نتائج البحث"></new-added-items>
  </div>
</template>

<script>
export default {
  name: "search",
  data: () => ({
    items: []
  }),
  async asyncData({ $axios, query, redirect }) {
    try {
      const queryTitle = encodeURI(query.title);
      const queryCat = encodeURI(query.category);

      const items = await $axios
        .get(
          `/items?title=${query.title ? queryTitle : ""}&category=${
            query.category ? queryCat : ""
          }`
        )
        .then(res => res.data.items);
      return { items };
    } catch (error) {
      console.log(error.message);
      return redirect("/not-found");
    }
  },
  methods: {
    fetchItems() {
      const queryTitle = encodeURI(this.$route.query.title);
      const queryCat = encodeURI(this.$route.query.category);
      this.$axios
        .get(
          `/items?title=${this.$route.query.title ? queryTitle : ""}&category=${
            this.$route.query.category ? queryCat : ""
          }`
        )
        .then(res => {
          this.items = res.data.items;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  watch: {
    "$route.query"() {
      this.fetchItems();
    }
  }
};
</script>
