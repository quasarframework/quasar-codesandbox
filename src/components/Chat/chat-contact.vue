<template>
  <div class="drawer-sub-contact column d-flex--grow">
    <div class="row">
      <q-banner dense inline-actions class="banner text-white d-flex--grow">Contact</q-banner>
      <q-input
        @focus="onSearchFocus"
        @blur="onSearchBlur"
        rounded
        :borderless="borderless || searchString !== ''"
        :outlined="outlined || searchString !== ''"
        v-model="searchString "
        input-class="text-right"
        class="q-ma-md search-input"
      >
        <template v-slot:append>
          <q-icon v-if="searchString === ''" name="search" class="search-icon" />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer search-icon"
            @click="searchString = ''"
          />
        </template>
      </q-input>
    </div>
    <q-scroll-area class="d-flex--grow">
      <q-slide-item
        v-for="item in contactListFiltered"
        :key="item.id"
        left-color="red"
        right-color="purple"
        @left="onLeft" @right="onRight"
        class="slider-item"
      >
        <template v-slot:left>
          <div class="row items-center">
            <q-icon left name="done" />Left
          </div>
        </template>
        <template v-slot:right>
          <div class="row items-center">
            Right content.. long
            <q-icon right name="alarm" />
          </div>
        </template>

        <q-item clickable @click="onSelectContact(item)">
          <q-item-section top avatar>
            <q-avatar>
              <img :src="item.avata" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{item.name}}</q-item-label>
            <q-item-label caption lines="2">{{item.lastMessage}}</q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{item.lastActivity}}</q-item-label>
            <q-icon name="fiber_manual_record" color="green" v-if="item.status == 'online'"></q-icon>
            <q-icon name="fiber_manual_record" color="yellow" v-else-if="item.status == 'away'"></q-icon>
            <q-icon name="fiber_manual_record" color="red" v-else-if="item.status == 'busy'"></q-icon>
            <q-icon name="fiber_manual_record" color="grey" v-else></q-icon>
          </q-item-section>
        </q-item>
      </q-slide-item>
    </q-scroll-area>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { firebaseDb } from "../../boot/firebase";

export default {
  name: "ChatContact",
  data() {
    return {
      timer: null,
      borderless: true,
      outlined: false,
      rounded: false,
      searchString: "",
      color: ""
    };
  },
  computed: {
    ...mapGetters("chatModule", ["contactList"]),
    contactListFiltered() {
      if (this.searchString == "") {
        return this.contactList;
      } else {
        return this.contactList.filter(item =>
          item.name.includes(this.searchString)
        );
      }
    }
  },
  methods: {
    ...mapActions("chatModule", ["findChatRoomByUserInfo"]),
    onSelectContact(userInfo) {
      this.findChatRoomByUserInfo(userInfo);
    },
    onSearchFocus() {
      this.borderless = false;
      this.rounded = true;
      this.outlined = true;
      this.color = "white";
    },
    onSearchBlur() {
      this.borderless = true;
      this.rounded = false;
      this.outlined = false;
      this.color = "";
    },
     onLeft ({ reset }) {
      this.finalize(reset)
    },

    onRight ({ reset }) {
      this.finalize(reset)
    },

    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 1000)
    }
  }
};
</script>

<style>
</style>