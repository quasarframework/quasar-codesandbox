<template>
  <q-page class="column fullscreen bg-green items-center">
    <q-bar dense class="full-width bg-primary text-white">
      <div>Room Tracking</div>
      <q-space />
      <div>Brightline Anesthesiology</div>
    </q-bar>

    <div class="row col-8 bg-pink full-width q-pa-sm">View</div>
    <div class="row col bg-teal full-width q-pa-sm">Control</div>
    <q-fab
      color="primary"
      text-color="black"
      icon="keyboard_arrow_left"
      direction="left"
    >
      <q-fab-action
        color="light-blue-2"
        text-color="black"
        @click="onClick"
        icon="mail"
      />
      <q-fab-action
        color="amber"
        text-color="black"
        @click="onClick"
        icon="alarm"
      />
    </q-fab>
    <q-dialog>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Go to Site:</div>
          <q-input type="text" label="Site Name" v-model="siteField"></q-input>
          <q-input type="password" label="Password" v-model="pwField"></q-input>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Submit" @click="openSite" />
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import roomStatus from 'components/PushRoomStatus.vue'
import cryptr from 'object-hash'
import showRoomStatus from 'components/ShowRoomStatus.vue'
export default {
  name: 'PageIndex',
  components: { roomStatus, showRoomStatus },
  created() {
    window.v = this
    window.cryptr = cryptr
  },
  methods: {
    addState() {},
    openSite() {
      if (this.pwField && this.siteField) {
        try {
          var vm = this
          let pw = vm.pwField
          let site = vm.siteField
          //use siteField and pwField to create siteAddress,
          let siteAddress = cryptr({ site, pw })
          console.log(siteAddress)
          //clear pwField
          this.pwField = null

          //bind topLevel DB for referencing in the view;
          vm.siteRef = vm.$db.ref('sites').child(siteAddress)
          //tie child references to vueData for writes.
          var bindPoints = [
            'siteConfig',
            'siteState',
            'siteHistory',
            'siteMessages'
          ]
          for (let point of bindPoints) {
            let child = vm.siteRef.child(point)
            vm.refs[point] = child
            vm.$rtdbBind(point, child)
          }
          // label site at end of process.
        } catch (error) {
          console.log(error)
          vm.$q.notify(`Unable to load site\n ${error}`)
        }
      } else {
        this.$q.notify('Enter a site name and password')
      }
    }
  },
  computed: {},

  data() {
    return {
      refs: {},
      siteConfig: {},
      siteState: {},
      siteHistory: {},
      siteMessages: {},
      pwField: null,
      siteField: null,
      siteName: null,
      siteRef: null,
      siteDB: null,
      room: null,
      site: null,
      roomList: null,
      roomStatusForm: { room: null, status: null, time: null },
      roomStatus: null
    }
  }
}
</script>
