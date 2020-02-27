<template>
  <q-page >
    <div class="chat-content row absolute full-width full-height">
      <div class="col chat-container"  v-if="selectedChatRoom">
        <div class="row chat-header">
          <q-banner dense inline-actions class="banner text-white d-flex--grow">
            {{chatRoomInfo.name}}
            <template v-slot:action>
              <div class="text-white">
                <q-tabs v-model="tab" indicator-color="secondary">
                  <q-tab name="Chat" label="Chat" />
                  <q-tab name="Files" label="Files" />
                </q-tabs>
              </div>
            </template>
          </q-banner>
        </div>
        <div class="row chat-content">
          <div class="column d-flex--grow q-ma-lg">
            <q-scroll-area
              class="d-flex--grow q-px-lg"
              ref="chatContentScroller"
              id="chatContentScroller"
              @scroll.self="onScrollSecond"
            >
              <template  v-for="chat in chatContent">
                <EnmojiMessage
                  v-if="chat.messageType === 'enmoji'"
                  :name="'enmoji'"
                  :avatar="peerers[chat.sender].avata"
                  :icons="chat.message"
                  :sent="userId === chat.sender"
                  :stamp="chat.date"
                  :key="chat.id"
                  :id="chat.id"
                />
                <q-chat-message
                  v-else
                  :name="peerers[chat.sender].name"
                  :avatar="peerers[chat.sender].avata"
                  :text="chat.message"
                  :sent="userId === chat.sender"
                  :stamp="'text'"
                  :key="chat.id"
                  :id="chat.id"
                />
              </template>
              
            </q-scroll-area>
          </div>
        </div>
        <div class="row chat-input">
          <ChatInput></ChatInput>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import ChatInput from "./chat-input";
import { mapGetters, mapState } from "vuex";
import { firebaseAuth } from "boot/firebase";
import { scroll } from "quasar";
const { getScrollTarget, setScrollPosition } = scroll; // Hint: Use "LPR" for <q-layout view=...>

export default {
  name: "ChatContent",
  data() {
    return {
      userId: "",
      tab: "Chat",
    };
  },
  computed: {
    ...mapGetters("chatModule", [
      "chatRoomInfo"
    ]),
    ...mapState('chatModule', ['selectedChatRoom']),
    chatContent() {
       return this.chatRoomInfo.chatContent ? this.chatRoomInfo.chatContent : [];
    },
    peerers() {
      return this.chatRoomInfo.peerers ? this.chatRoomInfo.peerers : {};
    }
  },
  updated() {
    setTimeout(() => {
      const parent = getScrollTarget(
        this.$refs.chatContentScroller,
        "#chatContentScroller .scroll"
      );
      const child = getScrollTarget(
        this.$refs.chatContentScroller,
        "#chatContentScroller .absolute.full-width>div:last-child"
      );
      setScrollPosition(parent, this.$refs.chatContentScroller.scrollSize);
    }, 1000);
  },
  mounted() {
    if (firebaseAuth.currentUser) {
      this.userId = firebaseAuth.currentUser.uid;
    }
  },
  components: {
    ChatInput,
    EnmojiMessage: require('./enmoji-message').default
  }
};
</script>

<style lang="scss">
</style>