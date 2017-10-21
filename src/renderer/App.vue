<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Builds from '../components/Builds.vue'
  import Logs from '../components/Logs.vue'
  import Settings from '../components/Settings.vue'
  export default {
    name: 'reminder-tool-2',
    components:{
      Builds,
      Logs,
      Settings
    }
  }
</script>

<style>
  /* CSS */
</style>
