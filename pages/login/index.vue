<template>
  <v-container>
    <Login></Login>
  </v-container>
</template>

<script>
export default {
  name: "user-login",
  middleware: "auth",
  auth: "guest"
};
</script>
