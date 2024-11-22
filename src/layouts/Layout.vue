<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>Quasar Todo List App</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <FooterTabs v-for="link in essentialLinks" :key="link.label" v-bind="link"/>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">Navigation</q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.label" v-bind="link"/>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'
import FooterTabs from 'components/FooterTabs'

export default {
  name: 'Layout',

  components: {
    EssentialLink,
    FooterTabs
  },

  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          label: 'To Do',
          icon: 'list',
          to: '/'
        },
        {
          label: 'Settings',
          icon: 'settings',
          to: '/settings'
        }
      ]
    }
  }
}
</script>
