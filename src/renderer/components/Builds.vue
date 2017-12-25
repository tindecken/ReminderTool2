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
    };
  },
  methods: {
    
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