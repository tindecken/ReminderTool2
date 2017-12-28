<template>
  <section class="section">
    <b-tabs type="is-toggle" expanded @change="getBuilds">
        <b-tab-item label="Builds" icon="build">
          <builds></builds> 
          
        </b-tab-item>
        <b-tab-item label="Logs" icon="log">
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
  import * as ba from 'vso-node-api/BuildApi'
  import * as bi from 'vso-node-api/interfaces/BuildInterfaces';
  const collectionUrl = require('./config').collectionUrl
  const token = require('./config').token
  const project = require('./config').project
  let vsts = require('vso-node-api')
  let authHandler = vsts.getPersonalAccessTokenHandler(token)
  let connect = new vsts.WebApi(collectionUrl, authHandler)
  let vstsBuild = connect.getBuildApi();
  // import Settings from '../components/Settings'
  const ipcRenderer = require("electron").ipcRenderer;
  export default {
    name: "home-page",
    components:{
        Builds,
        Logs
        // Settings
      },
    data: function() {
      return {
        buildDefs: [],
      };
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
      getBuilds(value){
        if(value === 0){ //Tab đầu tiên (Builds)
          console.log('Bạn đã chọn Tab đầu tiên')
          getBuildDefs().then(v => {
            this.buildDefs = v
            console.log(this.buildDefs[0].id + " " + this.buildDefs[0].name)
          })
      }
    }
  }
 }

 async function getBuildDefs(){
  return await vstsBuild.getDefinitions(project)
  //  let defs = await vstsBuild.getDefinitions(project)
  //  defs.forEach((defRef) => {
  //   // console.log(defRef.name + " (" + defRef.id + ')')
  //   console.log(defRef.authoredBy.displayName)}
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