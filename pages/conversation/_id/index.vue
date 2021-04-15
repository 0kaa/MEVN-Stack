<template>
  <v-container>
    <v-row class="w-auto">
      <v-col md="4">
        <conversations-component
          :conversations="conversations"
        ></conversations-component>
      </v-col>
      <v-col cols="12" md="8">
        <div class="d-flex flex-column">
          <ul class="mb-8 pa-0" id="chat-container" ref="chatContainer">
            <li
              v-for="message in messages"
              :key="message._id"
              class="msg-item"
              :class="
                $auth.loggedIn &&
                message.sender_id._id !== $auth.$state.user._id
                  ? 'out-msg'
                  : 'in-msg '
              "
            >
              <div
                class="d-flex align-center"
                :class="
                  $auth.loggedIn &&
                  message.sender_id._id !== $auth.$state.user._id
                    ? 'dir-ltr'
                    : ''
                "
              >
                <div
                  :class="
                    $auth.loggedIn &&
                    message.sender_id._id !== $auth.$state.user._id
                      ? 'mr-4'
                      : ''
                  "
                >
                  <v-img
                    v-if="
                      $auth.loggedIn &&
                        message.sender_id._id !== $auth.$state.user._id
                    "
                    :src="message.sender_id.image"
                    width="35"
                    height="35"
                    class="rounded-circle"
                  ></v-img>
                </div>

                <div
                  dir="auto"
                  class="msg"
                  :class="
                    $auth.loggedIn &&
                    message.sender_id._id !== $auth.$state.user._id
                      ? ''
                      : 'my-msg primary white--text'
                  "
                  v-text="message.msg"
                  style="text-align:start"
                ></div>
              </div>
            </li>
          </ul>
          <v-form
            v-model="valid"
            @submit.prevent="sendMessage()"
            ref="form"
            lazy-validation
            autocomplete="off"
          >
            <v-row class="w-100">
              <v-col cols="2" lg="1" class="align-self-center">
                <v-btn
                  fab
                  :disabled="!msg"
                  color="primary"
                  @click.prevent="sendMessage()"
                >
                  <v-icon>
                    mdi-send
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col
                ><v-text-field
                  name="message"
                  placeholder="ارسل رسالة"
                  id="id"
                  outlined
                  hide-details
                  rounded
                  v-model="msg"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "conversation",
  data: () => ({
    soundurl: "/sound.mp3",
    messages: [],
    valid: false,
    conversation: {},
    conversations: [],
    msg: ""
  }),
  sockets: {
    chatMessage: function(res) {
      this.messages.push(res);
      setTimeout(() => {
        this.scrollTo();
      }, 1);
    }
  },
  computed: {
    ID() {
      if (this.$auth.loggedIn) {
        if (this.conversation.sender_id._id === this.$auth.$state.user._id) {
          return this.conversation.received_id._id;
        } else {
          return this.conversation.sender_id._id;
        }
      } else {
        return 0;
      }
    }
  },

  mounted() {
    this.scrollTo();
  },
  methods: {
    scrollTo() {
      var chatDiv = this.$refs.chatContainer;
      chatDiv.scrollTop = chatDiv.scrollHeight;
    },
    sendMessage() {
      this.$axios
        .post("/chat/message", {
          msg: this.msg,
          conversation_id: this.conversation._id,
          sender_id: this.$auth.$state.user._id,
          received_id: this.ID
        })
        .then(() => {
          this.scrollTo();
          this.$refs.form.reset();
        });
    }
  },
  async asyncData({ $axios, params, redirect, $auth }) {
    try {
      const chat = await $axios.get(`/chat/${params.id}`);
      const conversations = await $axios.get(
        "/chat/conversations",
        {},
        {
          headers: {
            Authorization: $auth.strategy.token.get()
          }
        }
      );
      if (
        $auth.loggedIn &&
        ($auth.$state.user._id === chat.data.conversation.sender_id._id ||
          $auth.$state.user._id === chat.data.conversation.received_id._id)
      ) {
        return {
          messages: chat.data.messages.reverse(),
          conversation: chat.data.conversation,
          conversations: conversations.data.conversations
        };
      } else {
        return redirect("/not-found");
      }
    } catch (error) {
      return redirect("/not-found");
    }
  }
};
</script>

<style lang="scss" scoped>
.theme--dark {
  #chat-container {
    @media (min-width: 768px) {
      &::-webkit-scrollbar-track {
        // background: #272727;
        background: #272727 !important;
      }
    }
  }
}
#chat-container {
  max-height: 350px;
  min-height: 350px;
  overflow-y: auto;
  @media (min-width: 768px) {
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      // background: #272727;
      background: #888;
    }
    &::-webkit-scrollbar-thumb {
      // background: #3c8de9;
      background: #3c8de9;
    }
  }
}
.msg-item {
  margin-bottom: 15px;
  &.in-msg,
  &.out-msg {
    margin-bottom: 10px !important;
  }
  &.out-msg {
    padding-left: 20px;
  }
}
.theme--light {
  .msg {
    background-color: #ebebeb;
  }
}
.msg {
  font-size: 13px;
  text-align: start;
  font-weight: 100;
  background-color: #1e1e1e;
  padding: 10px 20px;
  border-radius: 0 100px 100px 0;
  max-width: 80%;
  line-height: 1.6;
  &.my-msg {
    border-radius: 100px 0 0 100px;
  }
}
</style>
