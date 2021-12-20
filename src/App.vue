<template>
  <div id="app">
    <v-header />
    <router-view />
  </div>
</template>
<script>
import vHeader from "@/components/layouts/header";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    vHeader,
  },
  data(){
    return{
      windowWidth: window.innerWidth
    }
  },
  methods:{
    ...mapActions([
      "setWidth"
    ]),
    resizeListener() {
      this.windowWidth = window.innerWidth
      this.setWidth(this.windowWidth)
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeListener)
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeListener)
  },
};
</script>
<style lang="scss" src="../src/assets/styles/App.scss"></style>
