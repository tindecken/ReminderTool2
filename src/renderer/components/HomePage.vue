<template>
  <section class="section">
    <div class="container">
      <div class="columns is-gapless">
        <div class="column is-narrow">
          <div class="" style="width: 100px;background-color:#ffdd57;">
            <a class="button is-primary">
              <span class="icon">
                <i class="fa fa-cog is-large"></i>
              </span>
              <span>Settings</span>
            </a>
          </div>
        </div>
        <div class="column">
          <div class="" style="background-color:#23d160;">
            <a class="button is-primary">
              <span class="icon">
                <i class="fa fa-cog is-large"></i>
              </span>
              <span>Settings</span>
            </a>
          </div>
        </div>
      </div>
      <div class="columns is-gapless">
        <div class="column is-narrow">
          <div class="" style="width: 100px;background-color:#ffdd57;">
            <a class="button is-primary">
              <span class="icon">
                <i class="fa fa-cog is-large"></i>
              </span>
              <span>Settings</span>
            </a>
          </div>
        </div>
        <div class="column">
          <div class="" style="background-color:#23d160;">
            <a class="button is-primary">
              <span class="icon">
                <i class="fa fa-cog is-large"></i>
              </span>
              <span>Settings</span>
            </a>
          </div>
        </div>
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
      go(){
        console.log('Number [' + this.number + "]")
        ipcRenderer.send('go', this.number)
      }
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