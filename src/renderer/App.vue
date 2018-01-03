<template>
  <div id="app" class="l-application">
    <router-view>
      <span class="icon is-medium"><i class="mdi mdi-account mdi-36px"></i></span>
    </router-view>
  </div>
</template>

<script>
  export default {
    name: 'reminder-tool-2',
    components:{
    }
  }
</script>

<style>
  /* CSS */
  .l-application {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /* overflow: hidden; */
}
</style>
