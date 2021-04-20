<template>
  <div class="conversation-chat" v-if="conversations && conversations.length">
    <nuxt-link
      :to="`/conversation/${chat._id}`"
      v-for="chat in conversations"
      :key="chat._id"
      class="mb-5 d-block conversation-item text--primary v-btn "
      :class="$vuetify.theme.dark ? 'theme--dark' : 'theme--light'"
    >
      <div class="user-header d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <div class="img ml-3">
            <v-img
              :src="
                chat.sender_id._id === $auth.$state.user._id
                  ? chat.received_id.image
                  : chat.sender_id.image
              "
              class="rounded-circle d-flex align-center justify-center primary text-center white--text"
              width="50"
              height="50"
            >
              {{
                chat.sender_id._id === $auth.$state.user._id
                  ? !chat.received_id.image
                    ? chat.received_id.username.charAt(0)
                    : ""
                  : !chat.sender_id.image
                  ? chat.sender_id.username.charAt(0)
                  : ""
              }}
            </v-img>
          </div>
          <div class="user-content">
            <h3 class="user-title">
              {{
                chat.sender_id._id === $auth.$state.user._id
                  ? chat.received_id.username
                  : chat.sender_id.username
              }}
            </h3>

            <p
              class="ma-0 user-msg"
              v-if="messages && messages.conversation_id == chat._id"
            >
              {{ messages.msg }}
            </p>
            <p class="ma-0 user-msg" v-else>
              {{ chat.latest_msg }}
            </p>
          </div>
        </div>
        <div
          class="date"
          v-if="messages && messages.conversation_id == chat._id"
        >
          {{ messages.updatedAt | formatDate }}
        </div>
        <div class="date" v-else>
          {{ chat.updatedAt | formatDate }}
        </div>
      </div>
    </nuxt-link>
  </div>
  <div v-else>
    لا يوجد محدثات سابقة
  </div>
</template>

<script>
export default {
  name: "ConversationsComponent",
  props: ["conversations"],
  data: () => ({
    messages: ""
  }),
  computed: {
    ourConv() {
      return this.conversations.reverse();
    }
  },
  sockets: {
    chatMessage: function(res) {
      this.messages = res;
    }
  }
};
</script>

<style lang="scss" scoped>
.conversation-item {
  padding: 10px;
  &.nuxt-link-active {
    background: #272727;
  }
  .user-content {
    .user-title {
      font-size: 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 200px;
      text-transform: initial;
    }
    .user-msg {
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 180px;
      text-transform: initial;
    }
  }
  .date {
    font-size: 12px;
  }
}
.theme--light .conversation-item {
  &.nuxt-link-active {
    background: #d9dadd;
  }
}
</style>
