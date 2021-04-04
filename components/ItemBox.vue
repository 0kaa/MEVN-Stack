<template>
  <v-card elevation="0">
    <div class="item-box">
      <div class="box-inner">
        <div class="box-header d-flex align-center justify-space-between">
          <nuxt-link
            class="user-section d-flex align-center text--primary"
            to="/profile"
          >
            <v-img
              class="user-img rounded-circle ml-3"
              max-width="40"
              src="/v.png"
            ></v-img>
            <div>
              <h5 class="mb-0">محمود صبري</h5>
              <span class="text--secondary body-2 font-weight-reqular"
                >20/10/2021</span
              >
            </div>
          </nuxt-link>
          <v-menu offset-y bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>

            <v-list min-width="100">
              <v-list-item link>
                <v-list-item-title class="font-weight-medium red--text"
                  >حذف</v-list-item-title
                >
              </v-list-item>
              <v-divider></v-divider>

              <v-list-item link>
                <v-list-item-title class="font-weight-medium red--text"
                  >حذف</v-list-item-title
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="box-content">
          <v-img
            src="https://api.asol-tec.net/storage/portfolios/Mci4K2634zNMMjRlJhP17btVjD26a2qgDGMMi6Bv.jpeg"
          ></v-img>
        </div>
      </div>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.theme--light {
  .item-box {
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.05);
  }
}
.item-box {
  .box-inner {
    .box-header {
      padding: 20px;
    }
  }
}
</style>
