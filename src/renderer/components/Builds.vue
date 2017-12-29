<template>
  <div id="builds">
      <b-table
        :data="builds"
        :hoverable="true"
        :striped="true"
        :bordered="true"
        :loading="$store.state.isLoading">
        <template slot-scope="props">
            <b-table-column label="ID" width="40" numeric>
                {{ props.row.id }}
            </b-table-column>
            <b-table-column label="Build Name">
                <a v-on:click.stop.prevent="open(props.row._links.web.href)">{{ props.row.name }}</a>
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
  name: "vue-builds",
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
  },
  created: function(){
    console.log('Build Created function')
    console.log('Store [' + this.$store.state.isLoading + ']')
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
#builds {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
}
</style>