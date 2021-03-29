<template>
  <div class="search">
    <div class="d-flex align-center">
      <div class="h-search">
        <div class="d-flex align-center">
          <div class="search-input-text">
            <v-text-field
              v-model="search"
              filled
              flat
              background-color="transparent"
              solo
              dense
              placeholder="ابحث عن اي شيئ .."
              required
              hide-details
            ></v-text-field>
          </div>
          <div class="border"></div>
          <div class="search-input-select">
            <v-select
              filled
              flat
              background-color="transparent"
              solo
              dense
              :menu-props="{ offsetY: true }"
              :items="items"
              v-model="select"
              no-data-text="لا يوجد بيانات حالية"
              hide-details
              required
            ></v-select>
          </div>
        </div>
      </div>
      <v-btn height="50" tile color="primary">
        <v-icon>mdi-search-web</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    model: null,
    search: null,
    select: "0",
    items: [
      { text: "كل الاقسام", value: "0" },
      { text: "State 1" },
      { text: "State 2" },
      { text: "State 3" },
      { text: "State 4" },
      { text: "State 5" },
      { text: "State 6" },
      { text: "State 7" }
    ]
  })
};
</script>

<style lang="scss" scoped>
.search {
  flex-basis: 510px;
}
.h-search {
  border: 1px solid #dedede;
  padding: 4px 0;
  box-shadow: 0 0 6px hsl(0deg 0% 0% / 16%);
  display: flex;
  align-items: center;
  .search-input-text {
    flex-basis: 250px;
  }
  .border {
    width: 2px;
    flex-basis: 2px;
    min-height: 30px;
    max-height: 30px;
    background: #cccccc;
  }
  .search-input-select {
    flex-basis: 180px;
  }
}
</style>
