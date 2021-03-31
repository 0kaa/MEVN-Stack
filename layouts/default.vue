<template>
  <v-app>
    <Navbar></Navbar>
    <v-main class="pt-5 main-content">
      <nuxt keep-alive />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Default"
};
</script>
