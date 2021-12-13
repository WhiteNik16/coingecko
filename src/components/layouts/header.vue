<template>
  <div>
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
        <a-select default-value="usd" style="width: 120px" @change="choiceCurrency">
          <a-select-option value="usd">
            USD
          </a-select-option>
          <a-select-option value="eur">
            EUR
          </a-select-option>
          <a-select-option value="uah" >
            UAH
          </a-select-option>
        </a-select>
      </a-menu>
    </a-layout-header>
  </a-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
@Component
export default class vHeader extends Vue {

  @Action
  setCurrency!: (currency:string) => void


  public choiceCurrency(value:string):void{
  this.setCurrency(value)
  }

}
</script>

<style>

</style>