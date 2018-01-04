<template>
  <div id="builds">
      <b-table
        :data="builds"
        :hoverable="true"
        :striped="true"
        :bordered="true"
        :loading="$store.state.isLoading">
        <template slot-scope="props">
            <b-table-column label="ID" numeric>
                {{ props.row.id }}
            </b-table-column>
            <b-table-column label="Build Definition">
                <a v-on:click.stop.prevent="open(props.row._links.web.href)">{{ props.row.name }}</a>
            </b-table-column>
            <b-table-column label="Last Build">
                {{ props.row.lastBuild.buildNumber }}
            </b-table-column>
            <b-table-column label="Result">
                <a v-if="props.row.lastBuild.result" v-on:click.stop.prevent="open(props.row.lastBuild._links.web.href)">{{ props.row.lastBuild.result }}</a>
                <a v-else v-on:click.stop.prevent="open(props.row.lastBuild._links.web.href)">{{ props.row.lastBuild.status }}</a>
            </b-table-column>
            <b-table-column label="Action">
                <button disabled="props.row.lastBuild.status == 'inProgress'" class="button is-primary" v-on:click="queueBuild(props.row.id)">Queue</button>
            </b-table-column>
        </template>
      </b-table>
  </div>
</template>

<script>
import Store from '../store/index'
import axios from 'axios'
const ipcRenderer = require("electron").ipcRenderer;
  const collectionUrl = require('./config').collectionUrl
  const collectionVSRMUrl = require('./config').collectionVSRMUrl
  const token = require('./config').token
  const project = require('./config').project
  const auth = require('./config').auth
export default {
  store: Store,
  name: "builds",
  props: ['builds', 'isLoading'],
  data: function() {
    return {
    }  
  },
  computed: {
    
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    queueBuild(buildDefId){
      queueBuildbyId(buildDefId, function(response){
      })
    }
  },
  created: function(){
  }
}

function queueBuildbyId(buildDefId, callback){
  axios({
    method:'post',
    url:`${collectionUrl}/${project}/_apis/build/builds?api-version=2.0`,
    auth,
    data: {
      "definition": {
        "id": buildDefId
      }
    } 
  }).then(function(response){
    callback(response.data)
  })
}

</script>

<style>
#builds {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
}
</style>