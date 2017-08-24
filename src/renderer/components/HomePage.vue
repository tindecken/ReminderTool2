<template>
  <div class="container">
      <h1 class="title">
        Hello World
      </h1>
      <p class="subtitle">
        My first website with <strong>Bulma</strong>!
      </p>
      <a class="button is-white">White</a>
    <a class="button is-light">Light</a>
    <a class="button is-dark">Dark</a>
    <a class="button is-black">Black</a>
    <a class="button is-link">Link</a>
    <a class="button is-primary">Primary</a>
<a class="button is-info">Info</a>
<a class="button is-success">Success</a>
<a class="button is-warning">Warning</a>
<a class="button is-danger">Danger</a>
    </div>
</template>

<script>
  export default {
    name: 'home-page',
    methods: {
      open (link) {
        this.$electron.shell.openExternal(link)
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

</style>
