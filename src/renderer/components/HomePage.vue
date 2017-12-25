<template>
  <section class="section">
    <b-tabs type="is-toggle" expanded @change="onChange">
        <b-tab-item label="Builds" icon="build">
          <builds></builds>
        </b-tab-item>
        <b-tab-item label="Logs" icon="history">
          <logs></logs>
        </b-tab-item>
        <!-- <b-tab-item label="Settings" icon="settings">
          <settings></settings>
        </b-tab-item> -->
      </b-tabs>
  </section>

</template>

<script>
  import Builds from '../components/Builds'
  import Logs from '../components/Logs'
  // import Settings from '../components/Settings'
  const ipcRenderer = require("electron").ipcRenderer;
  export default {
    name: "home-page",
    components:{
        Builds,
        Logs
        // Settings
      },
    data() {
      return {

      };
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
      onChange(value){
        if(value === 0){ //Tab đầu tiên (Builds)
          console.log('Bạn đã chọn Tab đầu tiên')
        }
      }
    }
  }
  
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");
body {
  font-family: "Source Sans Pro", sans-serif;
}
::-webkit-scrollbar {
  display: none;
}
.section{
  padding: 0px;
}
</style>