<template>
  <div class="search">
    <div class="d-flex align-center" style="height:42px;">
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
              clearable
              dense
              placeholder="كل الاقسام"
              :menu-props="{ offsetY: true }"
              :items="$store.state.categories"
              item-text="title"
              item-value="_id"
              v-model="select"
              no-data-text="لا يوجد بيانات حالية"
              hide-details
            >
            </v-select>
          </div>
        </div>
      </div>
      <v-btn height="100%" color="primary">
        <v-icon>mdi-magnify</v-icon>
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

<style lang="scss">
.search {
  flex-basis: 510px;
}
.theme--light {
  .h-search {
    .border {
      background: rgba($color: #000000, $alpha: 0.1);
    }
  }
}
.theme--dark {
  .h-search {
    background: rgba($color: #121212, $alpha: 0.3);
    .border {
      background: #12121247;
    }
  }
}
.h-search {
  background: rgba($color: #000000, $alpha: 0.06);
  height: 100%;
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
  }
  .search-input-select {
    flex-basis: 180px;
    .v-input {
      font-size: 12px;
    }
  }
}
</style>
