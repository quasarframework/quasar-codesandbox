<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      round
      color="primary"
      icon="add"
      v-on:click="openForm"
      class="q-ma-md absolute-top-right"
    />

    <q-dialog v-model="formComponent">
      <q-card>
        <q-card-section>
          <div class="text-h6">Terms of Agreement</div>
        </q-card-section>

        <q-separator/>

        <q-card-section style="max-height: 50vh" class="scroll">
          <CreateProduct/>
        </q-card-section>

        <q-separator/>

        <q-card-actions align="right">
          <q-btn label="Сохранить" color="positive" v-close-popup/>
          <q-btn label="Закрыть" color="negative" v-on:click="hideForm"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import CreateProduct from 'components/CreateProduct'
export default {
  props: ['value'],
  computed: {
    formComponent: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },
  data() {
    return {}
  },
  components: {
    CreateProduct
  },
  methods: {
    openForm() {
      this.$emit('open-form')
    },
    hideForm() {
      this.$emit('hide-form')
    }
  }
}
</script>