<template>
  <v-app>
    <Navbar></Navbar>
    <v-main class="py-5 main-content">
      <nuxt
        keep-alive
        :keep-alive-props="{
          exclude: [
            'home',
            'category',
            'conversation',
            'conversations',
            'search'
          ]
        }"
      />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Default"
};
</script>
