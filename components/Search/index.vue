<template>
  <v-form
    @submit.prevent="searchQuery()"
    class="search"
    v-model="valid"
    ref="form"
    lazy-validation
  >
    <div class="d-flex align-center" style="height:42px;" v-if="searchNav">
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
              @click:clear="clearCat()"
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
      <v-btn height="100%" color="primary" type="submit">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </div>
    <div v-else>
      <div class="h-search modal">
        <div class="d-flex align-center modal-inner">
          <div class="search-input-text">
            <v-text-field
              v-model="search"
              filled
              flat
              class="rounded-0"
              solo
              dense
              placeholder="ابحث عن اي شيئ .."
              required
              hide-details
            ></v-text-field>
          </div>
          <div class="search-input-select">
            <v-select
              flat
              solo
              filled
              class="rounded-0"
              clearable
              @click:clear="clearCat()"
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
        <v-btn
          height="100%"
          color="primary"
          type="submit"
          tile
          block
          class="mt-4 pa-2"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </div>
  </v-form>
</template>

<script>
export default {
  props: ["searchNav"],
  data: () => ({
    valid: false,
    isLoading: false,
    model: null,
    search: "",
    select: ""
  }),
  methods: {
    clearCat() {
      setTimeout(() => {
        this.select = "";
      }, 100);
    },
    searchQuery() {
      this.$router.push(`/search?title=${this.search}&category=${this.select}`);
      this.$store.commit("searchToggle", false);
    }
  }
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
      background: rgba($color: #fff, $alpha: 0.15);
    }
  }
}
.h-search {
  background: #f7f8fc;
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
