<template>
  <section class="new-added">
    <v-container>
      <h2 class="section-title mb-8" v-if="title">{{ title }}</h2>
      <v-row class="w-auto" v-if="items && items.length">
        <v-col cols="12" lg="6" v-for="item in items" :key="item._id">
          <item-box :items="item"></item-box>
        </v-col>
      </v-row>
      <p v-else>لا يوجد اعلانات حاليا</p>
    </v-container>
  </section>
</template>

<script>
export default {
  name: "NewAddedItems",
  props: ["items", "title"]
};
</script>
