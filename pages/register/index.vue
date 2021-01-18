<template>
  <v-row justify="center">
    <Register></Register>
  </v-row>
</template>
<script>
import axios from "axios";
import Register from "../../components/Authentication/Register";
export default {
  name: "Home",
  middleware: "register",
  components: {
    Register,
  },
};
</script>
