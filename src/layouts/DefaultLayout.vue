<template>
  <q-layout view="hHh lpR fFf" class="dark-theme">
    <q-header elevated class="header">
      <q-toolbar>
        <q-toolbar-title class="absolute-center">Awesome Todo</q-toolbar-title>
        <q-btn
          v-if="!loggedIn"
          to="/auth"
          flat
          icon-right="account_circle"
          label="Login"
          class="absolute-right"
        />

        <q-btn
          v-else
          @click="logoutUser"
          flat
          icon-right="account_circle"
          :label="'Logout '+ email"
          class="absolute-right"
        />
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :icon="nav.icon"
          :label="nav.label"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="767"
      :width="102"
      bordered
      content-class="bg-grey-8"
      :mini="false"
    >
      <div class="row align-items-stretch d-flex--grow">
        <div class="column drawer-main">
          <q-list dark>
            <q-item-label header>Navigation</q-item-label>

            <q-item
              v-for="nav in navs"
              :key="nav.label"
              :to="nav.to"
              :class="{'text-grey-4': true, 'selected': nav.label == selectedMain }"
              exact
              clickable
            >
              <q-item-section avatar class="align-center main-nav">
                <div>
                  <q-icon size="24px" :name="nav.icon"/>
                </div>
                <div>
                  <q-item-label>{{ nav.label }}</q-item-label>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <!-- <div class="column bg-grey-9 d-flex--grow">
          <ChatSubNav></ChatSubNav>
        </div> -->
      </div>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { openURL } from "quasar";
import ChatSubNav from 'components/Chat/chat-sub-nav.vue'
import { firebaseAuth } from '../boot/firebase';

export default {
  name: "MyLayoutChat",
  data() {
    return {
      selectedMain: "Chat",
      miniState: true,
      leftDrawerOpen: this.$q.platform.is.desktop,
      navs: [
        {
          label: "Activity",
          icon: "notifications",
          to: "/"
        },
        {
          label: "Chat",
          icon: "chat",
          to: "/"
        },
        {
          label: "Teams",
          icon: "people",
          to: "/"
        },
        {
          label: "Calls",
          icon: "call",
          to: "/"
        },
        {
          label: "Files",
          icon: "insert_drive_file",
          to: "/settings"
        }
      ],
      email: ''
    };
  },
  computed: {
    ...mapState("authModule", ["loggedIn"])
  },
  methods: {
    ...mapActions("authModule", ["logoutUser"]),
    openURL
  },
  watch: {
    loggedIn () {
      this.email = firebaseAuth.currentUser.email
    }
  },
  components: {
    ChatSubNav
  }
};
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
}

.q-drawer {
  .q-drawer__content {
    display: flex;
  }
  .q-router-link--exact-active {
    color: white !important;
  }
  .main-nav.q-item__section {
    padding-right: 0px !important;
  }
  a {
    justify-content: center;
  }
}

</style>
