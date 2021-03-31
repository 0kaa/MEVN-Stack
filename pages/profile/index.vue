<template>
  <div class="d-flex justify-center">
    <h1>{{ $auth.state.user.username }}</h1>
  </div>
</template>
<script>
export default {
  middleware: "auth",
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
