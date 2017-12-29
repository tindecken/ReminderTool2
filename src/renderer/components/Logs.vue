<template>
  <div id="logs">
    <button>Logs</button>
  </div>

</template>

<script>
const ipcRenderer = require("electron").ipcRenderer;
export default {
  name: "logs",
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
  /* ::-webkit-scrollbar {
    display: none;
  } */
  #logs{
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
  }
</style>