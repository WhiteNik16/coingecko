<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <a-layout-header>
      <div class="logo" >
        <router-link to="/">
        <img id='logo' src="../../assets/images/logo.png"  alt="logo">
        </router-link>
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          <router-link to="/">
          Home
        </router-link>
        </a-menu-item>

        <a-menu-item key="2">
          nav 2
        </a-menu-item>
        <a-menu-item key="3">
          nav 3
        </a-menu-item>
      </a-menu>
    </a-layout-header>
  </a-layout>
</template>

<script>
export default {
  name: "vHeader"
};
</script>

<style>

</style>