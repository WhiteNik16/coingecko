<template>
  <div id="app">
    <v-header/>
    <router-view />
  </div>
</template>
<script>
import vHeader from "@/components/layouts/header";
export default {
  name: 'App',
  components:{
    vHeader,
  },

}
</script>
<style lang="scss" src="../src/assets/styles/App.scss">
</style>
