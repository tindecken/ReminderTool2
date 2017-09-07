<template>
  <section class="section">
      <div class="columns is-gapless is-mobile">
          <div class="column is-three-quaters">
              <input class="input is-info" type="text" placeholder="Input number in seconds">
          </div>
          <div class="column is-narrow-mobile is-narrow-tablet is-narrow-desktop">
              <a class="button is-info is-outlined">GO !</a>
          </div>
        </div>
  </section>
</template>

<script>
  export default {
    name: 'home-page',
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }

</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  @import "~bulma/css/bulma.css";
  body {
    font-family: 'Source Sans Pro', sans-serif;
  }
  ::-webkit-scrollbar { display: none; }
</style>