<template>
  <div id="builds">
      <b-table
        :data="builds"
        focusable>
        <template slot-scope="props">
            <b-table-column label="ID" width="40" numeric>
                {{ props.row.id }}
            </b-table-column>
            <b-table-column label="Build Name">
                {{ props.row.name }}
            </b-table-column>
        </template>
      </b-table>
  </div>
</template>

<script>
const ipcRenderer = require("electron").ipcRenderer;
export default {
  name: "vue-builds",
  props: ['builds'],
  data: function() {
      const tableDataSimple = [
                { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016-10-15 13:43:27', 'gender': 'Male' },
                { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016-12-15 06:00:53', 'gender': 'Male' },
                { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016-04-26 06:26:28', 'gender': 'Female' },
                { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016-04-10 10:28:46', 'gender': 'Male' },
                { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016-12-06 14:38:38', 'gender': 'Female' }
            ]
    return {
      tableDataSimple
    }  
  },
  computed: {
    
  },
  methods: {
    
  },
  created: function(){
    console.log('Build Created function')
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");
body {
  font-family: "Source Sans Pro", sans-serif;
}
::-webkit-scrollbar {
  display: none;
}
#builds {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
}
</style>