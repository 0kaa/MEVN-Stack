<template>
  <v-card elevation="0">
    <div class="item-box">
      <div class="box-inner">
        <div class="box-header d-flex align-center justify-space-between">
          <div class="user-section d-flex align-center text--primary">
            <nuxt-link
              :to="`/user/${items.user._id}`"
              :title="items.user.username || 'user'"
            >
              <v-img
                v-if="items.user.image"
                :src="items.user.image"
                class="user-img rounded-circle ml-3"
                width="40"
                height="40"
              ></v-img>
              <v-img
                v-else
                class="user-img rounded-circle ml-3 d-flex align-center text-center"
                :class="colors[Math.floor(Math.random() * 5)]"
                width="40px"
                height="40px"
              >
                {{ items.user.username ? items.user.username.charAt(0) : "" }}
              </v-img>
            </nuxt-link>
            <div>
              <nuxt-link
                :title="items.user.username || 'user'"
                :to="`/user/${items.user._id}`"
                class="mb-1 text--primary"
                v-if="items.user"
                >{{ items.user.username }}</nuxt-link
              >
              <div class="ad-details d-flex align-center">
                <div class="text--secondary detail-item date-text ">
                  <v-icon right x-small>
                    mdi-clock-outline
                  </v-icon>
                  {{ items.createdAt | formatDate }}
                </div>
                <div
                  class="text--secondary detail-item date-text"
                  v-if="items.location"
                >
                  <v-icon right x-small>
                    mdi-map-marker-outline
                  </v-icon>
                  {{ items.location }}
                </div>
                <nuxt-link
                  :to="`/category/${items.category._id}`"
                  class="text--secondary detail-item date-text"
                  v-if="items.category"
                >
                  <v-icon right x-small>
                    mdi-folder
                  </v-icon>
                  {{ items.category.title }}
                </nuxt-link>
              </div>
            </div>
          </div>
          <!-- <v-menu offset-y bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>

            <v-list min-width="200">
              v-if="items.user._id === $auth.$state.user._id"
              <v-list-item link @click="deleteItem()">
                <v-list-item-title
                  class="red--text d-flex align-center justify-space-between"
                >
                  <div>حذف</div>
                  <v-icon color="red">mdi-delete</v-icon>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu> -->
        </div>
        <div class="box-content">
          <h3 class="ad-title">{{ items.title }}</h3>
          <p class="ad-description text--secondary">
            {{ items.description }}
          </p>
        </div>
        <div class="box-img position-relative">
          <v-img :aspect-ratio="4 / 3" :src="items.image"></v-img>
          <div class="badge primary">{{ items.type.title }}</div>
        </div>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  name: "item-box",
  props: ["items"],
  data: () => ({
    colors: ["purple", "primary", "orange", "red", "grey"]
  }),
  methods: {
    deleteItem() {
      alert("delete");
    }
  }
};
</script>
<style lang="scss" scoped>
.theme--light {
  .item-box {
    box-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.05);
    .box-inner .box-header .user-section .ad-details .detail-item:after {
      background-color: #00000099;
    }
  }
}
.v-card {
  height: 100%;
}
.item-box {
  height: 100%;
  .box-inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .box-header {
      padding: 20px;
      .user-section {
        .ad-details {
          .detail-item {
            margin-left: 10px;
            display: flex;
            align-items: center;
            &:after {
              content: "";
              width: 4px;
              height: 4px;
              background-color: #ffffffb3;
              border-radius: 50%;
              display: inline-block;
              margin-right: 10px;
            }
            &:last-child {
              margin: 0;
              &:after {
                display: none;
              }
            }
          }
        }
      }
    }
    .box-content {
      padding: 0 20px 20px;
      .ad-title {
        font-size: 18px;
        font-weight: 600;
      }
      .ad-description {
        font-size: 12px;
        font-weight: normal;
        margin-top: 15px;
      }
    }
    .box-img {
      .badge {
        position: absolute;
        top: 10px;
        padding: 3px 10px;
        border-radius: 2px;
        font-size: 12px;
        right: 10px;
      }
    }
  }
}
</style>
