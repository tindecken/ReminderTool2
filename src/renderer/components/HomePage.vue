<template>
    <div class="container is-fullhd">
  <div class="notification">
    This container is <strong>fullwidth</strong> <em>until</em> the <code>$fullhd</code> breakpoint.
  </div>
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
