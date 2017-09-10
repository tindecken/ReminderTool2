<template>
  <section class="section">
      <div class="columns is-gapless is-mobile">
          <div class="column is-three-quaters">
            <div class="control has-icons-right">
              <input autofocus="true" v-model="number" v-on:keyup="isDisabled" v-validate="'required|between:1750,3600'" class="input is-info is-large" type="text" placeholder="Input number between 1750-3600">
              <span class="icon is-right">
                <i v-bind:class="{'fa fa-check': !disabled, 'fa fa-exclamation-triangle': disabled}"></i>
              </span>
            </div>
          </div>
          <div class="column is-narrow-mobile is-narrow-tablet is-narrow-desktop">
              <a class="button is-outlined is-info is-large" v-bind:disabled="disabled" v-on:click="go(number)">GO !</a>
          </div>
      </div>
  </section>
</template>

<script>
  const ipcRenderer = require('electron').ipcRenderer
  export default {
    name: 'home-page',
    data() {
      return{
        number: '',
        disabled: true
      }
    },
    methods: {
      go(){
        ipcRenderer.send('go')
      },
      open(link) {
        this.$electron.shell.openExternal(link)
      },
      isDisabled() {
        // evaluate whatever you need to determine disabled here...
        if(this.errors.any()){
          return this.disabled = true
        }else{
          return this.disabled = false
        }
      },
      
    }
  }

</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  body {
    font-family: 'Source Sans Pro', sans-serif;
  }
  ::-webkit-scrollbar { display: none; }
</style>
