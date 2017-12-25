<template>
  
<section class="section">
  <div class="container">
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
      <button class="button is-info is-large width" v-on:click='connect'>Connect</button>
    </div>
      </div>
  </section>
</template>

<script>
const ipcRenderer = require("electron").ipcRenderer;
import axios from 'axios'
export default {
  name: "settings",
  data() {
    return {
      
    };
  },
  methods: {
    connect: function(event){
      ipcRenderer.send('vsts-oauth','getToken')
    }
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
</style>