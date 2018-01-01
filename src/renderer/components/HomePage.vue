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
  import axios from 'axios'
  import Store from '../store/index'
  const collectionUrl = require('./config').collectionUrl
  const token = require('./config').token
  const project = require('./config').project
  const auth = require('./config').auth

  // import Settings from '../components/Settings'
  const ipcRenderer = require("electron").ipcRenderer;
  export default {
    name: "home-page",
    store: Store,
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
          this.$store.commit('setIsloadingTrue', this.$store.state)
          getAllBuildDefs(function(data){
            thiz.buildDefs = data.value
            thiz.buildDefs.forEach(element => {
              getLastBuildByBuildDefId(element.id, function(dataReturn){
                console.log('Build Def ID ' + element.id)
                console.log(dataReturn)
              })
            });
            thiz.$store.commit('setIsloadingFalse', thiz.$store.state)
          })
          console.log('End - Getting build defs')

        }
      }
    },
    created: function(){
      var thiz = this
      this.$store.commit('setIsloadingTrue', this.$store.state);
      getAllBuildDefs(function(data){
        thiz.buildDefs = data.value
        thiz.$store.commit('setIsloadingFalse', thiz.$store.state)
      })
    }
  }
 
function getAllBuildDefs(callback){
  axios({
    method:'get',
    url:`${collectionUrl}/${project}/_apis/build/definitions?api-version=2.00`,
    auth
  }).then(function(response){
    callback(response.data) // Phải trả về hàm, để khi sử dụng, tham số truyền vào là 1 hàm, không được: cb = response
  })
}

function getLastBuildByBuildDefId(buildDefId, callback){
  axios({
    method:'get',
    url:`${collectionUrl}/${project}/_apis/build/builds?api-version=2.00&definitions=${buildDefId}&$top=1`,
    auth
  }).then(function(response){
    callback(response.data)
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
/* ::-webkit-scrollbar {
  display: none;
} */
.section{
  padding: 0px;
}
</style>