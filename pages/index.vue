<template>
  <v-row justify="center">
    <Posts></Posts>
  </v-row>
</template>
<script>
import axios from "axios";
import Posts from "../components/Posts";
export default {
  name: "Home",
  components: {
    Posts
  }
};
</script>
