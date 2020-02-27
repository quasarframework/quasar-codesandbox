<template>
  <div :class="{'q-message': true, 'q-message-sent': sent, 'q-message-received': !sent}" id="-M0uMdG9lBnxKHV6ID_q">
    <div class="q-message-container row items-end no-wrap">
      <div class="q-message-icons">
        <p v-for="icon in icons" :key="icon" v-html="icon"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Enmoji-Message',
    props: ['sent', 'name', 'avatar', 'icons', 'stamp']
};
</script>

<style>
</style>
