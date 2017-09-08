<template>
  <section class="section">
      <div class="columns is-gapless is-mobile">
          <div class="column is-three-quaters">
            <div class="control has-icons-right">
              <input v-model="number" v-on:keyup="isDisabled" v-validate.initial="number" data-vv-rules="required|between:1750,3600" class="input is-info" type="text" placeholder="Input number between 1750-3600">
              <span class="icon is-right">
                <i :class="{'fa fa-check': !disabled, 'fa fa-exclamation-triangle': disabled}"></i>
              </span>
            </div>
              <!-- <input name="field"  v-model="number" v-validate.initial="number" data-vv-rules="'required|email'" class="input is-info" type="text" placeholder="Input number between 1750-3600">
              <p class="text-danger" v-if="errors.has('email')">{{ errors.first('email') }}</p> -->
              
              <!-- <p class="text-danger" v-if="errors.has('number')">{{ errors.first('number') }}</p> -->
          </div>
          <div class="column is-narrow-mobile is-narrow-tablet is-narrow-desktop">
              <a class="button is-outlined is-info" v-bind:disabled="disabled">GO !</a>
          </div>
      </div>
  </section>
</template>

<script>
  
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