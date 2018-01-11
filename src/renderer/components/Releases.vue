<template>
  <div id="releases">
    <b-table
      :data="releases"
      :hoverable="true"
      :striped="true"
      :bordered="true"
      :loading="$store.state.isLoadingRelease"
      default-sort-direction="desc"
      default-sort="lastReleaseID">
      <template slot-scope="props">
          <b-table-column label="ID" width="40" numeric>
              {{ props.row.id }}
          </b-table-column>
          <b-table-column label="Release Definition">
              <a v-on:click.stop.prevent="open(props.row._links.web.href)">{{ props.row.name }}</a>
          </b-table-column>
          <b-table-column label="Last Release Name">
              <a v-on:click.stop.prevent="open(props.row.lastRelease._links.web.href)">{{ props.row.lastRelease.name }}</a>
          </b-table-column>
          <b-table-column label="Environments">
            <div v-for="item in props.row.lastRelease.releaseDetail.environments" :key="item.id">
              <a v-on:click.stop.prevent="open(props.row.lastRelease.releaseDetail._links.web.href)">{{item.name}} {{item.status}}</a>
            </div>
          </b-table-column>
          <b-table-column label="Created On" :visible="true">
              {{ props.row.lastRelease.releaseDetail.createdOn ? new Date(props.row.lastRelease.releaseDetail.createdOn).toLocaleDateString() : '' }}
            <!-- </div> -->
          </b-table-column>
          <b-table-column label="Created By">
            {{props.row.lastRelease.releaseDetail.createdBy ? props.row.lastRelease.releaseDetail.createdBy.displayName : ''}}
          </b-table-column>
          <b-table-column label="Last Release ID" :visible="true" field="lastReleaseID" sortable numeric>
            {{props.row.lastRelease.id ? props.row.lastRelease.id : 'NA'}}
          </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import Store from '../store/index'
const ipcRenderer = require("electron").ipcRenderer;
export default {
  store: Store,
  name: "releases",
  props: ['releases', 'isLoadingRelease'],
  data: function() {
    return {
      label: []
    }
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
  },
  computed: {
    // isRejected: function(){
    //   if(this.releases[0].lastRelease.releaseDetail.environments[0].status == 'rejected'){
    //     return true
    //   }else{
    //     return false
    //   }
    // }
  },
};
</script>

<style>
  #releases{
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
  }
  tr.is-rejected {
      background: rgb(238,69,31) !important;
  }
</style>