<template>
  <div id="releases">
    <b-table
        :data="releases"
        :hoverable="true"
        :striped="true"
        :bordered="true"
        :loading="$store.state.isLoading">
        <template slot-scope="props">
            <b-table-column label="ID" width="40" numeric>
                {{ props.row.id }}
            </b-table-column>
            <b-table-column label="Build Definition">
                <a v-on:click.stop.prevent="open(props.row._links.web.href)">{{ props.row.name }}</a>
            </b-table-column>
            <b-table-column label="Last Result">
                <a v-if="props.row.lastResult" v-on:click.stop.prevent="open(props.row.lastBuildLink)">{{ props.row.lastResult }}</a>
                <a v-else v-on:click.stop.prevent="open(props.row.lastBuildLink)">{{ props.row.lastStatus }}</a>
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
  data() {
    return {
    };
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