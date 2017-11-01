<template>
  <section class="section">
      <b-tabs type="is-toggle" expanded>
        <b-tab-item label="Builds" icon="build">
          <builds></builds>
        </b-tab-item>
        <b-tab-item label="Logs" icon="history">
          <logs></logs>
        </b-tab-item>
        <b-tab-item label="Settings" icon="settings">
          <settings></settings>
        </b-tab-item>
      </b-tabs>
  </section>

</template>

<script>
  import Builds from '../components/Builds'
  import Logs from '../components/Logs'
  import Settings from '../components/Settings'
  const ipcRenderer = require("electron").ipcRenderer;
  export default {
    name: "home-page",
    components:{
        Builds,
        Logs,
        Settings
      },
    data() {
      return {
        // number: "",
        // disabled: true
      };
    },
    methods: {
      // open(link) {
      //   this.$electron.shell.openExternal(link);
      // },
      // isDisabled() {
      //   // evaluate whatever you need to determine disabled here...
      //   if (this.errors.any()) {
      //     return (this.disabled = true);
      //   } else {
      //     return (this.disabled = false);
      //   }
      // },
      // go() {
      //   console.log("Number [" + this.number + "]");
      //   ipcRenderer.send("go", this.number);
      // }
    }
  };
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