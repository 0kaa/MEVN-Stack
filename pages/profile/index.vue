<template>
  <div class="d-flex justify-center">
    <h1>{{ user[0].title }}</h1>
  </div>
</template>
<script>
export default {
  data: () => ({
    user: ""
  }),

  async asyncData({ $axios, store }) {
    const data = await $axios
      .get("/categories")
      .then(res => res.data.categories);
    return { user: data };
  }
};
</script>
