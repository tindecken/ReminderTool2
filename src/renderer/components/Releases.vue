<template>
  <div id="releases">
    <b-table
      :data="releases"
      :hoverable="true"
      :striped="true"
      :bordered="true"
      :loading="$store.state.isLoadingRelease"
      >
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
          <b-table-column label="Environment 1">
            <b-icon v-if="isRejected"
                icon="account"
                size="is-small">
            </b-icon>
            {{ props.row.lastRelease.releaseDetail.environments[0].name }}  {{ props.row.lastRelease.releaseDetail.environments[0].status }}
          </b-table-column>
          <!-- <b-table-column label="Environment 2">
            {{ props.row.lastNameEnvironment2 }}  {{ props.row.lastStatusEnvironment2 }}
          </b-table-column>
          <b-table-column label="Environment 3">
            {{ props.row.lastNameEnvironment3 }}  {{ props.row.lastStatusEnvironment3 }}
          </b-table-column>
          <b-table-column label="Environment 4">
            {{ props.row.lastNameEnvironment4 }}  {{ props.row.lastStatusEnvironment4 }}
          </b-table-column> -->
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
    }
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
  },
  computed: {
    isRejected: function(){
      if(this.releases[0].lastRelease.releaseDetail.environments[0].status == 'rejected'){
        return true
      }else{
        return false
      }
    }
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