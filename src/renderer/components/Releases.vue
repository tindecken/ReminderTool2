<template>
  <div id="releases">
    <b-table
      :data="releases"
      :hoverable="true"
      :striped="true"
      :bordered="true"
      :loading="$store.state.isLoadingRelease"
      default-sort-direction="asc"
      default-sort="lastRelease.releaseDetail.createdOn">
      <template slot-scope="props">
          <b-table-column label="ID" numeric>
              {{ props.row.id }}
          </b-table-column>
          <b-table-column label="Release Definition">
              <a v-on:click.stop.prevent="open(props.row._links.web.href)">{{ props.row.name }}</a>
          </b-table-column>
          <b-table-column label="Last Release Name">
              <a v-on:click.stop.prevent="open(props.row.lastRelease._links.web.href)">{{ props.row.lastRelease.name }}</a>
          </b-table-column>
          <b-table-column label="Deployment status">
            <div v-for="item in props.row.lastRelease.releaseDetail.environments" :key="item.id">
              <b-tooltip label="Click to open web" type="is-light" position="is-right" animated>
                <div v-on:click="open(props.row.lastRelease.releaseDetail._links.web.href)">
                  <b-tag :type="status(item.status)" size="is-medium" class="my_b_tag">
                    {{item.name}} {{item.status}}
                  </b-tag>
                </div>
              </b-tooltip>
            </div>
          </b-table-column>
          <b-table-column label="Created On" field="lastRelease.releaseDetail.createdOn" sortable>
            <div v-if="props.row.lastRelease.releaseDetail.createdOn">
              <timeago :since="props.row.lastRelease.releaseDetail.createdOn"></timeago>
            </div>
            <div v-else>        
            </div>
          </b-table-column>
          <b-table-column label="Created By"> 
            {{props.row.lastRelease.releaseDetail.createdBy ? props.row.lastRelease.releaseDetail.createdBy.displayName : ''}}
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
    status(status){
      if(status === "succeeded"){
        return "is-success"
      }else if(status === "partiallySucceeded"){
        return "is-warning"
      }else if(status === "rejected"){
        return "is-danger"
      }else if(status === "notStarted"){
        return "is-info"
      }
    }
  },
  computed: {
    isRejected: function(status){
      if(status === "succeeded"){
        return "is-info"
      }else{
        return "is-danger"
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
  .my_b_tag{
    margin-bottom: 2px
  }
</style>