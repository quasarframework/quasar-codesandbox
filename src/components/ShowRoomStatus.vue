<template>
  <div class="column">
    <div class="roomSelector row justify-center">
      <q-button-toggle
        size="xl"
        v-model="roomNumber"
        toggle-color="primary"
        :options="roomNumbers"
      >
      </q-button-toggle>
    </div>

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
  </div>
</template>

<script>
export default {
  name: 'showRoomStatus',
  computed: {
    roomNumbers() {
      return [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' }
      ]
    }
  },
  data() {
    return {
      roomNumber: null,
      roomCurrentStatus: null,
      roomStatusHistoryLength: 5,
      roomStatusHistory: null
    }
  }
}
</script>

<style>
</style>