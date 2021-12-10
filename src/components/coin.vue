<template>
<div class="coins">
  <div class="coin">
  <div class="coin__name"><span>{{coin.name}}</span><img :src="coin.image" ></div>
  <div class="coin__price">{{coin.current_price}}</div>
  <div class="coin__change_24h">{{coin.price_change_24h}}</div>
  <div class="coin__total-volume">{{coin.total_volume}}</div>
  <div class="coin__change_market-cap">{{coin.market_cap}}</div>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
@Component
export default class coin extends Vue {
 @Prop()readonly coin: any

  @Getter
  public coins!:any




}



</script>

<style scoped>

</style>