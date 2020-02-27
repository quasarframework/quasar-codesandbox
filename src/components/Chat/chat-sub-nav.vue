<template>
  <div class="column drawer-sub">
    <div class="row">
      <q-banner dense inline-actions class="drawer-sub-header text-white d-flex--grow">
        Chat
        <template v-slot:action>
          <div>
            <q-tabs v-model="tab" indicator-color="secondary">
              <q-tab name="Recent" label="Recent" />
              <q-tab name="Contact" label="Contact" />
            </q-tabs>
          </div>
        </template>
      </q-banner>
    </div>
    <div class="row d-flex--grow">
       <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut absolute"
  >
      <ChatRecent v-if="tab == 'Recent'"></ChatRecent>
      <ChatContact v-else-if="tab === 'Contact'"></ChatContact>
       </transition>
    </div>
  </div>
</template>

<script>
import ChatRecent from './chat-recent'
import ChatContact from './chat-contact'

export default {
  name: "ChatSubNav",
  data() {
    return {
      tab: "Contact"
    };
  },
  components: {
      ChatRecent,
      ChatContact
  }
};
</script>

<style>
</style>