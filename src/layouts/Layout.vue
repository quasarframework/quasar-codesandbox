 <template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar dense>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
          color="secondary"
        />
        <!-- <q-btn color="white" text-color="black" label="Standard"/> -->
        <q-chip
          v-if="loggedIn && userEmail !== null"
          text-color="secondary"
          color="primary"
        >{{ userEmail }}</q-chip>
        <q-btn
          v-else-if=" $route.name !== 'Login'"
          @click="goToLogin()"
          text-color="secondary"
          label="Login"
        />
        <q-toolbar-title class="absolute-center text-secondary black-chancery-font">
          <q-img
            src="../assets/hearth-writer-small.png"
            ratio="1"
            spinner-color="white"
            style="height: 20px; width: 150px"
          />
          <q-img
            src="../assets/typewriter.png"
            ratio="1"
            spinner-color="white"
            style="height: 40px; width: 70px"
          />
        </q-toolbar-title>
        <q-img
          class="q-ma-sm absolute-right"
          src="../assets/Everron_logo.png"
          ratio="1"
          spinner-color="white"
          style="height: 40px; width: 80px"
        />
      </q-toolbar>
      <q-separator color="secondary"/>
    </q-header>
    <!-- 
    <q-footer reveal elevated class="bg-grey-8 text-white">
      <q-tabs class="bg-primary">
        <q-route-tab
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          :label="nav.label"
          :icon="nav.icon"
        />
      </q-tabs>
    </q-footer>-->
    <q-drawer
      v-model="leftDrawerOpen"
      :width="150"
      :breakpoint="1700"
      show-if-above
      bordered
      content-class="bg-primary"
    >
      <q-list dark>
        <q-item-label header class="white">Navigation</q-item-label>
        <q-item
          v-for="nav in navs"
          :key="nav.label"
          :to="nav.to"
          class="text-grey-4"
          exact
          clickable
        >
          <q-item-section avatar>
            <q-icon color="secondary" :name="nav.icon"/>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          v-if="!loggedIn && $route.name !== 'Signup'"
          key="Signup"
          to="/signup"
          name="Signup"
          class="text-grey-4"
          exact
          clickable
        >
          <q-item-section avatar>
            <q-icon color="secondary" name="face"/>
          </q-item-section>
          <q-item-section>Signup</q-item-section>
        </q-item>

        <q-item
          v-if="!loggedIn && $route.name !== 'Login'"
          key="Login"
          to="/login"
          name="Login"
          class="text-grey-4"
          exact
          clickable
        >
          <q-item-section avatar>
            <q-icon color="secondary" name="face"/>
          </q-item-section>
          <q-item-section>Login</q-item-section>
        </q-item>

        <q-item v-if="loggedIn" @click="submitForLogout" class="text-grey-4" exact clickable>
          <q-item-section avatar>
            <q-icon color="secondary" name="face"/>
          </q-item-section>
          <q-item-section>Logout</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
// import EssentialLink from 'components/EssentialLink'
import { auth } from 'boot/firebase'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MainLayout',

  components: {},
  computed: {
    ...mapState('auth', ['loggedIn', 'userEmail'])
  },
  methods: {
    ...mapActions('auth', ['logout']),
    goToLogin: function() {
      if (this.$route.name !== 'Login') this.$router.push({ name: 'Login' })
    },
    submitForLogout: function() {
      // this.loggedIn = false;
      // this.user = null;
      this.leftDrawerOpen = false
      this.logout()
    }
  },

  data() {
    return {
      // url: 'assets/typwriter.png',
      // haveUser: null,

      // leftDrawerOpen: this.$q.platform.is.desktop,
      leftDrawerOpen: false,
      navs: [
        {
          label: 'Home',
          icon: 'home',
          // link: "https://quasar.dev",
          to: '/',
          name: 'Home'
        },
        {
          label: 'About',
          icon: 'info',
          // link: "https://quasar.dev",
          to: '/about',
          name: 'About'
        },
        {
          label: 'Account',
          icon: 'face',
          // link: "https://quasar.dev",
          to: '/account',
          name: 'Account'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* <style type="text/css" media="screen, print"> */
/* @font-face {
  font-family: 'black-chancery-font';
  src: url('/css/fonts/BLKCHCRY.TTF');
}

.black-chancery-font {
  font-family: 'black-chancery-font', serif;
} */

/* font-family: "Harabara Bold";
src: url("css/fonts/Harabara.eot"); */

/* @font-face {
  font-family: black-chancery-font;
  src: url('/css/fonts/BLKCHCRY.TTF');
}

.black-chancery-font {
  font-family: 'black-chancery-font';
} */

/* @media screen and (min-width: 768px) {
  .q-footer {
    display: none;
  }
} */
/* .q-drawer {
  .q-router-link--exact-active {
    color: white !important;
  }
} */
</style>