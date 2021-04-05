<template>
  <v-container>
    <Register></Register>
  </v-container>
</template>
<script>
export default {
  name: "user-register",
  middleware: "auth",
  auth: "guest"
};
</script>
