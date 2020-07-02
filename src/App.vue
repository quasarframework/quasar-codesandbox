<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
// so we can track onAuthStateChange
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions('auth', ['handleAuthStateChange'])
  },
  mounted() {
    this.handleAuthStateChange()
  }

}
</script>
