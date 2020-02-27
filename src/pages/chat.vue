<template>
  <q-page class="row">
    <template v-if="!loadingData">
      <ChatSubNav @onSelect="onSelectContact"></ChatSubNav>
      <div class="column d-flex--grow">
        <ChatContent></ChatContent>
      </div>
    </template>

    <template v-else>
      <span class="absolute-center">
        <q-spinner color="primary" size="3em" />
      </span>
    </template>
  </q-page>
</template>

<script>
import ChatContent from "../components/Chat/chat-content";
import ChatSubNav from "../components/Chat/chat-sub-nav.vue";
import {mapState} from 'vuex'
export default {
  name: "Chat",
  data() {
    return {
      selectedContact: ""
    };
  },
  computed: {
      ...mapState('chatModule', ['loadingData'])
  },
  methods: {
    onSelectContact(contactId) {
    }
  },
  components: {
    ChatContent,
    ChatSubNav
  }
};
</script>

<style>
</style>