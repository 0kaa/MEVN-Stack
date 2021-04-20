<template>
  <div class="ad-create">
    <ad-component></ad-component>
  </div>
</template>

<script>
export default {
  name: "ad-create",
  middleware: "auth"
};
</script>
