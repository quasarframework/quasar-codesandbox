<template>
  <q-page class="flex flex-center">
    <FormComponent v-model="formComponent" v-on:open-form="openForm" v-on:hide-form="hideForm"/>
    <q-btn label="Открыть" v-on:click="openForm"/>
  </q-page>
</template>

<script>
import FormComponent from 'components/FormComponent.vue'
export default {
  name: 'PageIndex',
  components: {
    FormComponent
  },
  data() {
    return {
      formComponent: false
    }
  },
  methods: {
    openForm() {
      this.formComponent = true
      console.log(this.formComponent)
    },
    hideForm() {
      this.formComponent = false
      console.log(this.formComponent)
    }
  }
}
</script>
