<template>
  <div class="column drawer-sub-recent d-flex--grow">
    <div class="row">
      <q-banner dense inline-actions class="banner text-white d-flex--grow">Recent</q-banner>
    </div>
    <div class="text-white">
      <q-item v-for="item in recentInfoChats" :key="item.id" clickable @click="onSelectChatRoom(item.id)">
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
          <q-item-label caption>{{item.lastDate}}</q-item-label>
          <q-icon name="fiber_manual_record" color="green" v-if="item.status  == 'online'"></q-icon>
          <q-icon
            name="fiber_manual_record"
            color="yellow"
            v-else-if="(item.status ) == 'away'"
          ></q-icon>
          <q-icon name="fiber_manual_record" color="red" v-else-if="item.status == 'busy'"></q-icon>
          <q-icon name="fiber_manual_record" color="grey" v-else></q-icon>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ChatRecent",
  computed: {
    ...mapGetters("chatModule", ["recentInfoChats"])
  },
  methods: {
    ...mapActions('chatModule', ['updateSelectedChatRoom']),
    onSelectChatRoom(id) {
      this.updateSelectedChatRoom(id);
    },
    status(value) {
      const lastActivity = (new Date() - new Date(value)) / 1000;
      const status =
        lastActivity < 5 ? "online" : lastActivity > 30 ? "offline" : "away";
      return status;
    }
  },
};
</script>

<style>
</style>