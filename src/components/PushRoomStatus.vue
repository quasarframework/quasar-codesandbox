<template>
  <div class="row justify-center">
    <q-list bordered separator>
      <q-item
        :key="key"
        v-for="(status, key) of roomStatusFirstFive"
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>Room: {{ status.room }}</q-item-label>
          <q-item-label caption lines="2"
            >Status: {{ status.status }}</q-item-label
          >
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>{{ parseTime(status.time) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <p class="col-xs-12 col">Room number</p>
    <div class="col-xs-12 row col">
      <q-btn-toggle
        v-model="roomStatusForm.room"
        toggle-color="primary"
        :options="[
          { label: 'One', value: '1' },
          { label: 'Two', value: '2' },
          { label: 'Three', value: '3' }
        ]"
      />
    </div>
    <p class="col-xs-12 col">Room Status</p>
    <div class="col-xs-12 row col">
      <q-btn-toggle
        v-model="roomStatusForm.status"
        toggle-color="primary"
        :options="[
          { label: 'Case Start', value: 'Case Start' },
          { label: 'Case End', value: 'Case End' },
          { label: 'Room Clean', value: 'Clean' },
          { label: 'Position/Prep', value: 'Position' }
        ]"
      />
    </div>
    <div class="col-xs-12 row col">
      <q-btn color="primary" @click="submitRoomStatus">Submit</q-btn>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'roomStatus',

  methods: {
    submitRoomStatus() {
      this.roomStatusForm.time = Date.now()
      this.$db.ref('roomStatus').push(this.roomStatusForm)
      this.$set(this.roomStatusForm, 'status', null)
      this.$set(this.roomStatusForm, 'time', null)
    },
    parseTime(dateString) {
      return moment(dateString, 'x').format('HH:mm MM/DD/YYYY')
    }
  },
  firebase() {
    var db = this.$db
    return {
      roomList: db.ref('roomList'),
      roomStatusFirst: db
        .ref('roomStatus')
        .orderByChild('time')
        .limitToFirst(1),
      roomStatusFirstFive: db
        .ref('roomStatus')
        .orderByChild('time')
        .limitToFirst(5)
    }
  },
  data() {
    return {
      roomStatusForm: { room: null, status: null, time: null }
    }
  }
}
</script>

<style>
</style>