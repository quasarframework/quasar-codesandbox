<template>
  <div class="q-gutter-y-md column d-flex--grow">
    <q-toolbar class="chat-input text-white">
      <q-btn
        round
        dense
        flat
        icon="menu"
        class="q-mr-xs"
        @click="showEnmojiDialog = !showEnmojiDialog"
      />
      <q-input
        dark
        dense
        standout
        v-model="text"
        class="q-ml-md d-flex--grow"
        @keypress.enter="onSendMessage"
        @input="onChangeText"
        
      >
        <template v-slot:append>
          <q-icon v-if="text !== ''" name="clear" class="cursor-pointer" @click="text = ''" />
          <q-icon name="send" @click="onSendMessage" :color="text !== '' ? 'blue-5' : 'grey-5'" />
        </template>
      </q-input>
    </q-toolbar>
    <div class="icons-modal" v-if="showEnmojiDialog">
      <q-card class>
        <div>
          <q-input dark dense standout class="d-flex--grow" v-model="searchEnmoji">
            <template v-slot:append>
              <q-icon v-if="searchEnmoji !== ''" name="clear" class="cursor-pointer" @click="searchEnmoji = ''" />
              <q-icon
                name="search"
                @click="onSendMessage"
                :color="searchEnmoji !== '' ? 'blue-5' : 'grey-5'"
              />
            </template>
          </q-input>
          <q-separator />
        </div>
        <q-card-section>
          <q-scroll-area class=" ">
            <div class="icon-container row q-ma-sm">
 <p
              v-for="enmoji in filteredEnmojis"
              :key="enmoji.icon"
              v-html="enmoji.icon"
              @click="onAddEnmoji(enmoji.icon)"
            ></p>
            </div>
           
          </q-scroll-area>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>


<script>
import { mapActions, mapState } from "vuex";
import { firebaseAuth } from "../../boot/firebase";
import {Platform} from 'quasar'
export default {
  name: "ChatInput",
  data() {
    return {
      searchEnmoji: '',
      text: "",
      userId: "",
      showEnmojiDialog: false,
      isTextMessage: false,
      isEnmojiMessage: false,
      emojis: [
        { code: "&#x1F600", icon: "ð", title: "grinning" },
        { code: "&#x1F603", icon: "ð", title: "grinning with big eyes" },
        { code: "&#x1F604", icon: "ð", title: "grinning face with smiling eyes" },
        { code: "&#x1F601", icon: "ð", title: "beaming face with smiling eyes" },
        { code: "&#x1F606", icon: "ð", title: "grinning squinting face" },
        { code: "&#x1F605", icon: "ð", title: "grinning face with sweat" },
        { code: "&#x1F923", icon: "ð¤£", title: "rolling on the floor laughing" },
        { code: "&#x1F602", icon: "ð", title: "face with tears of joy" },
        { code: "&#x1F642", icon: "ð", title: "slightly smiling face" },
        { code: "&#x1F643", icon: "ð", title: "upside-down face" },
        { code: "&#x1F609", icon: "ð", title: "winking face" },
        { code: "&#x1F60A", icon: "ð", title: "smiling face with smiling eyes" },
        { code: "&#x1F607", icon: "ð", title: "smiling face with halo" },

        { code: "&#x1F970", icon: "ð¥°", title: "smiling face with hearts" },
        { code: "&#x1F60D", icon: "ð", title: "smiling face with heart-eyes" },
        { code: "&#x1F929", icon: "ð¤©", title: "star-struck" },
        { code: "&#x1F618", icon: "ð", title: "face blowing a kiss" },
        { code: "&#x1F617", icon: "ð", title: "kissing face" },
        { code: "&#x1F61A", icon: "ð", title: "kissing face with closed eyes" },
        { code: "&#x1F619", icon: "ð", title: "kissing face with smiling eyes" },
        { code: "&#x1F60B", icon: "ð", title: "face savoring food" },
        { code: "&#x1F61B", icon: "ð", title: "face with tongue" },
        { code: "&#x1F61C", icon: "ð", title: "winking face with tongue" },
        { code: "&#x1F92A", icon: "ð¤ª", title: "zany face" },
        { code: "&#x1F61D", icon: "ð", title: "squinting face with tongue" },
        { code: "&#x1F911", icon: "ð¤", title: "money-mouth face" },
        { code: "&#x1F917", icon: "ð¤", title: "hugging face" },
        { code: "&#x1F92D", icon: "ð¤­", title: "face with hand over mouth" },
        { code: "&#x1F92B", icon: "ð¤«", title: "shushing face" },
        { code: "&#x1F914", icon: "ð¤", title: "thinking face" },
        { code: "&#x1F910", icon: "ð¤", title: "zipper-mouth face" }
      ]
    };
  },
  computed: {
    ...mapState("chatModule", ["selectedChatRoom"]),
    filteredEnmojis() {
      return this.emojis.filter(enmoji => enmoji.title.includes(this.searchEnmoji))
    }
  },
  mounted() {
    if (firebaseAuth.currentUser) {
      this.userId = firebaseAuth.currentUser.uid;
    }
    console.log(Platform)
  },
  methods: {
    ...mapActions("chatModule", ["sendMessage"]),
    onOpenEnmojiDialog() {
      if(Platform.is.win) {

      }
    },
    onSendMessage() {
      let data = {
        message: this.text,
        id: this.selectedChatRoom,
        sender: this.userId
      }
      if(this.isTextMessage) {
         data.messageType = 'text'
         this.sendMessage(data);
      } else if(this.isEnmojiMessage) {
        data.messageType = 'enmoji'
        this.sendMessage(data);
      }
      this.isTextMessage= false,
      this.isEnmojiMessage= false,
      this.text = "";
    },
    onChangeText(env) {
      this.isTextMessage = true;
    },
    onAddEnmoji(code) {
      this.isEnmojiMessage = true
      const currentString = this.text;
      this.text = `${currentString}${code}`;
    }
  }
};
</script>

<style>
</style>