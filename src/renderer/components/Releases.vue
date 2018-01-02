<template>
  <div id="releases">
    <b-table
      :data="releases"
      :hoverable="true"
      :striped="true"
      :bordered="true"
      :loading="$store.state.isLoadingRelease">
      <template slot-scope="props">
          <b-table-column label="ID" width="40" numeric>
              {{ props.row.id }}
          </b-table-column>
          <b-table-column label="Release Definition">
              <a v-on:click.stop.prevent="open(props.row._links.web.href)">{{ props.row.name }}</a>
          </b-table-column>
          <b-table-column label="Last Release Name">
            {{ props.row.lastReleaseName }}
          </b-table-column>
          <b-table-column label="Environment 1">
            {{ props.row.lastNameEnvironment1 }}  {{ props.row.lastStatusEnvironment1 }}
          </b-table-column>
          <b-table-column label="Environment 2">
            {{ props.row.lastNameEnvironment2 }}  {{ props.row.lastStatusEnvironment2 }}
          </b-table-column>
          <b-table-column label="Environment 3">
            {{ props.row.lastNameEnvironment3 }}  {{ props.row.lastStatusEnvironment3 }}
          </b-table-column>
          <b-table-column label="Environment 4">
            {{ props.row.lastNameEnvironment4 }}  {{ props.row.lastStatusEnvironment4 }}
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
    }
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
  }
};
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");
  body {
    font-family: "Source Sans Pro", sans-serif;
  }
  /* ::-webkit-scrollbar {
    display: none;
  } */
  #releases{
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 5px;
  }
</style>