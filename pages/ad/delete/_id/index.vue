<template>
  <div class="ad-delete">
    <v-container>
      <h1 class="text-center mb-8">
        هل تريد حذف <span class="primary--text">{{ ad.title }}</span> ؟
      </h1>
      <div class="actions text-center">
        <v-btn large color="primary" @click.prevent="deleteItem(ad._id)"
          >نعم</v-btn
        >
        <v-btn large @click.prevent="$router.go(-1)">رجوع</v-btn>
      </div>
    </v-container>
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
  methods: {
    async deleteItem(id) {
      const config = {
        headers: {
          _id: id,
          Authorization: this.$auth.strategy.token.get()
        }
      };
      await this.$axios.delete(`/items`, config);
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.ad-delete {
  h1 {
    font-size: 24px;
  }
}
</style>
