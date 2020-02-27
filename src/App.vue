<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import {firebaseAuth} from './boot/firebase';
import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    ...mapActions('chatModule', ['updateCurrentTime']),
    ...mapActions('authModule', ['handleAuthStateChange'])
  },
  mounted() {
    this.handleAuthStateChange()
    setInterval(() => {
      this.updateCurrentTime(null);
    }, 1000 * 60 * 4);
  }
}
</script>
