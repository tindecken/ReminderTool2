<template>
  <div id="settings">
    <b-field label="Email">
      <b-input type="email"
          value=""
          :has-counter="false"
          maxlength="30"
          size="is-large">
      </b-input>
    </b-field>
    <b-field label="Password">
      <b-input type="password"
          value=""
          :has-counter="false"
          maxlength="30"
          size="is-large"
          password-reveal>
      </b-input>
    </b-field>
    <b-field label="Server">
      <b-input
          size="is-large">
      </b-input>
    </b-field>
    <b-field label="Project">
      <b-input
          value=""
          :has-counter="false"
          maxlength="30"
          size="is-large">
      </b-input>
    </b-field>
    <div class="center">
      <button class="button is-info is-large width">Connect</button>
    </div>
  </div>
</template>

<script>
const ipcRenderer = require("electron").ipcRenderer;
export default {
  name: "settings",
  data() {
    return {
      // number: "",
      // disabled: true
    };
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
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
  div.center{
    text-align: center;
  }
  button.width{
    width: 10em;
  }
  #settings{
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
  }
</style>