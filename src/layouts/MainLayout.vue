<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>Title
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="right = !right"/>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="../pages/new.vue" label="Page One"/>
        <q-route-tab to="/pages/pagina" label="Page Two"/>
        <q-route-tab to="pagina.vue" label="Page Three"/>
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <!-- drawer content -->
      <div class="q-pa-md" style="max-width: 350px">
        <q-list bordered>
          <q-item clickable v-ripple>
            <q-item-section>Icon as avatar</q-item-section>
            <q-item-section avatar>
              <q-icon color="primary" name="bluetooth"/>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>Avatar-type icon</q-item-section>
            <q-item-section avatar>
              <q-avatar color="teal" text-color="white" icon="bluetooth"/>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>Rounded avatar-type icon</q-item-section>
            <q-item-section avatar>
              <q-avatar rounded color="purple" text-color="white" icon="bluetooth"/>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>Letter avatar-type</q-item-section>
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">R</q-avatar>
            </q-item-section>
          </q-item>

          <q-separator/>

          <q-item clickable v-ripple>
            <q-item-section>Image avatar</q-item-section>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>Image square avatar</q-item-section>
            <q-item-section avatar>
              <q-avatar square>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>Image rounded avatar</q-item-section>
            <q-item-section avatar>
              <q-avatar rounded>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png">
              </q-avatar>
            </q-item-section>
          </q-item>

          <q-separator/>

          <q-item clickable v-ripple>
            <q-item-section>List item</q-item-section>
            <q-item-section avatar>
              <q-avatar rounded>
                <img src="https://cdn.quasar.dev/img/mountains.jpg">
              </q-avatar>
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section>List item</q-item-section>
            <q-item-section thumbnail>
              <img src="https://cdn.quasar.dev/img/mountains.jpg">
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

    <q-footer reveal elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      right: false
    }
  }
}
</script>