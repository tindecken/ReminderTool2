<template>
  <section class="section">
    <b-tabs type="is-toggle" expanded @change="getBuilds">
        <b-tab-item label="Builds" icon="build">
          <builds :builds="buildDefs" :isLoading="isLoading"></builds> 
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
  import axios from 'axios'
  const collectionUrl = require('./config').collectionUrl
  const token = require('./config').token
  const project = require('./config').project
  let vsts = require('vso-node-api')
  let authHandler = vsts.getPersonalAccessTokenHandler(token)
  let connect = new vsts.WebApi(collectionUrl, authHandler)
  let vstsBuild = connect.getBuildApi();
  // import Settings from '../components/Settings'
  const ipcRenderer = require("electron").ipcRenderer;

  var instanceAxios = axios.create({
    // baseURL: 'https://some-domain.com/api/',
    timeout: 2000,
    headers: {'Accept': 'applicaton/json'},
    auth: {
      username: '',
      password: 'kohmv673xit7i2hgxgq7a6e6qadglkjmf2gw2kgdeqp47rw5c6qa'
    },
  });
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
        isLoading: true
      };
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link);
      },
      getBuilds(value){
        if(value === 0){ //Tab đầu tiên (Builds)
          console.log('Start - Getting build defs')
          var thiz = this
          this.isLoading = true
          getBuildbyAxios(function(data){
            thiz.buildDefs = data.value
            thiz.isLoading = false
            console.log('Start -- Du lieu tra ve')
            console.log(thiz.buildDefs)
            console.log('End -- Du lieu tra ve')
          })
          console.log('End - Getting build defs')
        }
      }
    },
    created: function(){
      var thiz = this
      this.isLoading = true
      getBuildbyAxios(function(data){
        thiz.buildDefs = data.value
        thiz.isLoading = false
      })
    }
  }
 
function getBuildbyAxios(cb){
  axios({
    method:'get',
    url:'https://acomsolutions.visualstudio.com/DefaultCollection/AutoTestManagement_Tool/_apis/build/definitions?api-version=2.0',
    auth: {
      username: '',
      password: 'kohmv673xit7i2hgxgq7a6e6qadglkjmf2gw2kgdeqp47rw5c6qa'
    }
  }).then(function(response){
    cb(response.data) // Phải trả về hàm, để khi sử dụng, tham số truyền vào là 1 hàm, không được: cb = response
  }).catch(function(error){
    console.log(error)
  })
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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