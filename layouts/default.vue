<template>
  <v-app>
    <Navbar></Navbar>
    <v-main class="py-5 main-content">
      <nuxt keep-alive :exclude="['home']" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Default"
};
</script>
