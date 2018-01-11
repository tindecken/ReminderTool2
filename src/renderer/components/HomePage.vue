<template>
  <section class="section">
    <b-tabs type="is-toggle" expanded @change="getBuilds" size="is-medium">
        <b-tab-item icon="arrow-left-bold" label="Builds" >
          <builds :builds="buildDefs" :isLoading="isLoading"></builds> 
        </b-tab-item>
        <b-tab-item  icon="arrow-right-bold" label="Releases">
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
        if(value === 0){ //Tab Builds
          var thiz = this
          this.$store.commit('setIsloadingTrue', this.$store.state)
          getAllBuildDefs(function(data){
            var buildDefsTemp = data.value
            for(let i = 0; i < buildDefsTemp.length; i++){
                buildDefsTemp[i].lastBuild = ""
                getLastBuildByBuildDefId(buildDefsTemp[i].id, function(dataReturn){
                  if(dataReturn.value[0] != null){
                    buildDefsTemp[i].lastBuild = dataReturn.value[0]
                  }
            })
          }
            thiz.buildDefs = buildDefsTemp
            thiz.$store.commit('setIsloadingFalse', thiz.$store.state)
        })
        }else if(value === 1){ //Tab Releases
          this.$store.commit('setIsloadingReleaseTrue', this.$store.state)
          var thiz = this
          getAllReleaseDefs().then(function(result){
            var releaseDefsTemp = {}
            console.log('<--- All Release Defs ')
            console.log(result.data.value)
            console.log('--- All Release Defs --->')
            releaseDefsTemp = result.data.value
            for(let i = 0; i < releaseDefsTemp.length; i++){
              releaseDefsTemp[i].lastRelease = {releaseDetail: {}};            
              getLastReleaseByReleaseDefId(releaseDefsTemp[i].id).then(function(dataReturn){
                if(dataReturn.data.count !== 0){  //Nếu có dữ liệu LastRelease
                  releaseDefsTemp[i].lastRelease = dataReturn.data.value[0];                  
                  releaseDefsTemp[i].lastRelease.releaseDetail = {}
                  getDetailOfRelease(releaseDefsTemp[i].lastRelease.id).then(function(releaseDetailReturn){
                    if(releaseDetailReturn.data.count !== 0){ //Nếu có dữ liệu LastRelease.ReleaseDetail
                      releaseDefsTemp[i].lastRelease.releaseDetail = releaseDetailReturn.data;
                      console.log(releaseDefsTemp[i].id, releaseDetailReturn.data.environments)
                    }
                    thiz.releasesDefs = releaseDefsTemp;
                    thiz.$store.commit('setIsloadingReleaseFalse', thiz.$store.state)
                  })
                }
              })
            }
          })
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

async function getAllReleaseDefs(){
  let result = await axios({
    method:'get',
    url:`${collectionVSRMUrl}/${project}/_apis/release/definitions?api-version=4.0-preview.3`,
    auth
  })
  return result
}

async function getLastReleaseByReleaseDefId(releaseDefId){
  let result = await axios({
    method:'get',
    url:`https://acomsolutions.vsrm.visualstudio.com/DefaultCollection/${project}/_apis/release/releases?definitionId=${releaseDefId}&api-version=4.0-preview.3&$top=1`,
    auth
  })
  return result
}

async function getDetailOfRelease(releaseId){
  let result = await axios({
    method:'get',
    url:`https://acomsolutions.vsrm.visualstudio.com/DefaultCollection/${project}/_apis/release/releases/${releaseId}?api-version=4.0-preview.3`,
    auth
  })
  return result
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

</script>

<style>
.section{
  padding: 0px;
}
</style>