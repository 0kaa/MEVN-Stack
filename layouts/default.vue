<template>
  <v-app>
    <Navbar></Navbar>
    <v-main class="mt-5">
      <nuxt keep-alive />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Default"
};
</script>
