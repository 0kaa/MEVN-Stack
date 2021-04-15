<template>
  <div class="search-modal d-flex justify-center align-center flex-column">
    <v-btn
      @click="$store.commit('searchToggle', false)"
      fab
      icon
      color="red"
      class="mb-8 v-btn--active"
    >
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <search :searchNav="false"></search>
  </div>
</template>

<script>
export default {
  name: "searchModal"
};
</script>

<style lang="scss">
.search-modal {
  background-color: rgba($color: #000000, $alpha: 0.95);
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9999999;
  padding: 0 10px;
  .search {
    flex-basis: auto;
    width: 100%;
    .h-search.modal {
      height: 100%;
      display: block;
      background: transparent;
      .modal-inner {
        width: 100%;
        .search-input-text {
          flex-basis: 60%;
          border-left: 2px solid #000;
        }
        .search-input-select {
          flex-basis: 40%;
        }
      }
    }
  }
}
</style>
