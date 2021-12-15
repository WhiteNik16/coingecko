<template>
<div class="coins">
  <div class="coin" @click="$router.push({ name: 'coinPage', params: { id: coin.id } })">
  <div class="coin__name"><span>{{coin.name}}</span><img :src="coin.image" ></div>
  <div class="coin__price" >{{ coin.current_price.toLocaleString()}} {{ currency.toUpperCase() }} </div>
  <div class="coin__change_24h" :style="colorOfChangePrice">{{coin.price_change_24h}}  {{ currency.toUpperCase() }} </div>
  <div class="coin__total-volume">{{coin.total_volume.toLocaleString()}}</div>
  <div  class="coin__change_market-cap"> {{coin.market_cap.toLocaleString()}}</div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { ICoins } from "@/types/types";
@Component
export default class coin extends Vue {
 @Prop()readonly coin: any

  @Getter
  public coins!:ICoins
  @Getter
  public currency!:string


  get colorOfChangePrice():string{
   if(this.coin.price_change_24h>0){
     return 'color:green'
   }
   return 'color:red'
  }

}



</script>

<style scoped>

</style>