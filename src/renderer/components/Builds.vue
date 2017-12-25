<template>
    <div id="builds">
      <button>Builds</button>
    </div>
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
  #builds{
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
  }
</style>