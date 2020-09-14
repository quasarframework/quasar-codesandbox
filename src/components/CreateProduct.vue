<template>
  <div class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 300px">
      <div class="row">
        <div class="col">
          <q-input outlined dense v-model="text" label="Standard" class="q-ma-sm"/>
        </div>
        <div class="col">
          <q-input outlined dense v-model="text" label="Standard" class="q-ma-sm"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: ''
    }
  }
}
</script>