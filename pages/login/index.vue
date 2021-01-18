<template>
  <v-row justify="center">
    <Login></Login>
  </v-row>
</template>
<script>
import Login from "../../components/Authentication/Login";
export default {
  name: "Home",
  middleware: "register",
  components: {
    Login,
  },
};
</script>
