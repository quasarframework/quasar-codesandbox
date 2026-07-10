<template>
  <q-footer elevated>
    <q-tabs>
      <q-route-tab :icon="icon" :to="to" :label="label"/>
    </q-tabs>
  </q-footer>
</template>

<script>
export default {
  name: 'FooterTabs',
  props: {
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: '#'
    }
  }
}
</script>

<style>
</style>
