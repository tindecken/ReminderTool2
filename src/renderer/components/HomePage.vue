<template>
  <section class="section">
    <b-tabs type="is-toggle" expanded @change="getBuilds">
        <b-tab-item label="Builds" icon="build">
          <builds :builds="buildDefs" :isLoading="isLoading"></builds> 
        </b-tab-item>
        <b-tab-item label="Releases" icon="releases">
          <releases :releases="releasesDefs " :isLoadingRelease="isLoadingRelease"></releases>
        </b-tab-item>
      </b-tabs>
  </section>

</template>

<script>
  import Builds from '../components/Builds'
  import Releases from '../components/Releases'
  import axios from 'axios'
  import Store from '../store/index'
  const collectionUrl = require('./config').collectionUrl
  const collectionVSRMUrl = require('./config').collectionVSRMUrl
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
        Releases
        // Settings
      },
    data: function() {
      return {
        buildDefs: [],
        releasesDefs: [],
        isLoadingRelease: true,
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
            var buildDefsTemp = data.value
            for(let i = 0; i < buildDefsTemp.length; i++){
                buildDefsTemp[i].lastStatus = ""
                buildDefsTemp[i].lastResult = ""
                buildDefsTemp[i].lastBuildLink = ""
                getLastBuildByBuildDefId(buildDefsTemp[i].id, function(dataReturn){
                  if(dataReturn.value[0] != null){
                    buildDefsTemp[i].lastStatus = dataReturn.value[0].status
                    buildDefsTemp[i].lastResult = dataReturn.value[0].result
                    buildDefsTemp[i].lastBuildLink = dataReturn.value[0]._links.web.href
                    // console.log(dataReturn.value[0]._links.web.href)
                    // console.log('Build Def ID ' + buildDefsTemp[i].id)
                    // console.log('Status: ' + buildDefsTemp[i].lastStatus)
                    // console.log('Result: ' + buildDefsTemp[i].lastResult)
                  }
              })
            }
            thiz.buildDefs = buildDefsTemp
            thiz.$store.commit('setIsloadingFalse', thiz.$store.state)
          })
          console.log('End - Getting build defs')
        }else if(value === 1){ //Tab Releases
          console.log('Start - Getting release defs')
          var thiz = this
          this.$store.commit('setIsloadingReleaseTrue', this.$store.state)
          getAllReleaseDefs(function(data){ //Get all Release Definitions
            var releaseDefsTemp = data.value
            console.log(releaseDefsTemp)
            for(let i = 0; i < releaseDefsTemp.length; i++){
                releaseDefsTemp[i].lastNameEnvironment1 = ""
                releaseDefsTemp[i].lastNameEnvironment2 = ""
                releaseDefsTemp[i].lastNameEnvironment3 = ""
                releaseDefsTemp[i].lastNameEnvironment4 = ""
                releaseDefsTemp[i].lastStatusEnvironment1 = ""
                releaseDefsTemp[i].lastStatusEnvironment2 = ""
                releaseDefsTemp[i].lastStatusEnvironment3 = ""
                releaseDefsTemp[i].lastStatusEnvironment4 = ""
                releaseDefsTemp[i].lastReleaseName = ""
                releaseDefsTemp[i].lastBuildLink = ""
                getLastReleaseByReleaseDefId(releaseDefsTemp[i].id, function(dataReturn){  //Get last release of one release definition
                  if(dataReturn.value[0] != null){
                    releaseDefsTemp[i].lastReleaseName = dataReturn.value[0].name
                    console.log('Last release ID of Release Definition is: ' + releaseDefsTemp[i].id + ' - ' + dataReturn.value[0].id)
                    getDetailOfRelease(dataReturn.value[0].id, function(releaseDetail){
                      if(releaseDetail.environments.length == 1){
                        console.log('First Environment status of release id : ' + dataReturn.value[0].id + ' is ' + releaseDetail.environments[0].status)
                        releaseDefsTemp[i].lastNameEnvironment1 = releaseDetail.environments[0].name
                        releaseDefsTemp[i].lastStatusEnvironment1 = releaseDetail.environments[0].status
                      }else if(releaseDetail.environments.length == 2){
                        console.log('First Environment status of release id : ' + dataReturn.value[0].id + ' is ' + releaseDetail.environments[0].status)
                        console.log('Second Environment status of release id : ' + dataReturn.value[0].id + ' is ' + releaseDetail.environments[1].status)
                        releaseDefsTemp[i].lastNameEnvironment1 = releaseDetail.environments[0].name
                        releaseDefsTemp[i].lastStatusEnvironment1 = releaseDetail.environments[0].status
                        releaseDefsTemp[i].lastNameEnvironment2 = releaseDetail.environments[1].name
                        releaseDefsTemp[i].lastStatusEnvironment2 = releaseDetail.environments[1].status
                      }else if(releaseDetail.environments.length == 3){
                        console.log('First Environment status of release id : ' + dataReturn.value[0].id + ' is ' + releaseDetail.environments[0].status)
                        console.log('Second Environment status of release id : ' + dataReturn.value[0].id + ' is ' + releaseDetail.environments[1].status)
                        releaseDefsTemp[i].lastNameEnvironment1 = releaseDetail.environments[0].name
                        releaseDefsTemp[i].lastStatusEnvironment1 = releaseDetail.environments[0].status
                        releaseDefsTemp[i].lastNameEnvironment2 = releaseDetail.environments[1].name
                        releaseDefsTemp[i].lastStatusEnvironment2 = releaseDetail.environments[1].status
                        releaseDefsTemp[i].lastNameEnvironment3 = releaseDetail.environments[2].name
                        releaseDefsTemp[i].lastStatusEnvironment3 = releaseDetail.environments[2].status
                      }else if(releaseDetail.environments.length == 4){
                        console.log('First Environment status of release id : ' + dataReturn.value[0].id + ' is ' + releaseDetail.environments[0].status)
                        console.log('Second Environment status of release id : ' + dataReturn.value[0].id + ' is ' + releaseDetail.environments[1].status)
                        releaseDefsTemp[i].lastNameEnvironment1 = releaseDetail.environments[0].name
                        releaseDefsTemp[i].lastStatusEnvironment1 = releaseDetail.environments[0].status
                        releaseDefsTemp[i].lastNameEnvironment2 = releaseDetail.environments[1].name
                        releaseDefsTemp[i].lastStatusEnvironment2 = releaseDetail.environments[1].status
                        releaseDefsTemp[i].lastNameEnvironment3 = releaseDetail.environments[2].name
                        releaseDefsTemp[i].lastStatusEnvironment3 = releaseDetail.environments[2].status
                        releaseDefsTemp[i].lastNameEnvironment4 = releaseDetail.environments[3].name
                        releaseDefsTemp[i].lastStatusEnvironment4 = releaseDetail.environments[3].status
                      }
                    })
                  }
              })
            }
            thiz.releasesDefs = releaseDefsTemp
            console.log(thiz.releasesDefs)
            thiz.$store.commit('setIsloadingReleaseFalse', thiz.$store.state)
          })
          console.log('End - Getting relase defs')
        }
      }
    },
    created: function(){
      this.getBuilds(0)
      this.getBuilds(1)
    }
  }
 
function getAllBuildDefs(callback){
  axios({
    method:'get',
    url:`${collectionUrl}/${project}/_apis/build/definitions?api-version=2.0`,
    auth
  }).then(function(response){
    callback(response.data) // Phải trả về hàm, để khi sử dụng, tham số truyền vào là 1 hàm, không được: cb = response
  })
}

function getLastBuildByBuildDefId(buildDefId, callback){
  axios({
    method:'get',
    url:`${collectionUrl}/${project}/_apis/build/builds?api-version=2.0&definitions=${buildDefId}&$top=1`,
    auth
  }).then(function(response){
    callback(response.data)
  })
}

function getAllReleaseDefs(callback){
  axios({
    method:'get',
    url:`${collectionVSRMUrl}/${project}/_apis/release/definitions?api-version=4.0-preview.3`,
    auth
  }).then(function(response){
    callback(response.data)
  })
}

function getLastReleaseByReleaseDefId(releaseDefId, callback){
  axios({
    method:'get',
    url:`https://acomsolutions.vsrm.visualstudio.com/DefaultCollection/${project}/_apis/release/releases?definitionId=${releaseDefId}&api-version=4.0-preview.3&$top=1`,
    auth
  }).then(function(response){
    callback(response.data)
  })
}

function getDetailOfRelease(releaseId, callback){
  axios({
    method:'get',
    url:`https://acomsolutions.vsrm.visualstudio.com/DefaultCollection/${project}/_apis/release/releases/${releaseId}?api-version=4.0-preview.3`,
    auth
  }).then(function(response){
    callback(response.data)
  })
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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