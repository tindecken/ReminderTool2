<template>
  <section class="section">
    <button>Builds</button>
  </section>

</template>

<script>
const ipcRenderer = require("electron").ipcRenderer;
export default {
  name: "vue-builds",
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