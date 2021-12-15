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
<!--        <a-menu-item key="1">-->
<!--          <router-link to="/">-->
<!--          Home-->
<!--        </router-link>-->
<!--        </a-menu-item>-->

        <a-select default-value="usd" style="width: 120px" @change="choiceCurrency">
          <a-select-option v-for=" currencyItem in currenciesList" :key="currencyItem" :value="currencyItem">
            {{ currencyItem.toUpperCase() }}
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
import { currencyList} from "@/constatnts/constants";

@Component
export default class vHeader extends Vue {

  @Action
  setCurrency!: (currency:string) => void

  public currenciesList = currencyList

public choiceCurrency(value:string):void{
  this.setCurrency(value)
  }

}
</script>

<style>

</style>