<template>
  <div class="ad-edit">
    <ad-component :mode="true" :data="ad"></ad-component>
  </div>
</template>

<script>
export default {
  name: "ad-edit",
  middleware: "auth",
  async asyncData({ $axios, params, redirect, $auth }) {
    try {
      const id = params.id;
      return $axios.get(`/items/${id}`).then(res => {
        if (res.data.user == $auth.$state.user._id) return { ad: res.data };
        else return redirect("/not-found");
      });
    } catch (error) {
      return redirect("/not-found");
    }
  },
  data: () => ({
    ad: {}
  }),
  methods: {}
};
</script>
