<template>
<div class="coinPage">
  <div class="coinPage__header">
    <div class="coinPage__header-coin">
      <img :src="coin.image.small">
      <span id="nameCoin">{{coin.name}}({{coin.symbol}})</span>
      <div class="coinPage__header-coin-price">
        <span id="priceCoin">${{coin.market_data.current_price.usd.toLocaleString()}}</span>
        <span :style="colorOfChange" id="change24h">{{coin.market_data.price_change_percentage_24h_in_currency.usd}}%</span>
      </div>
      <div class="coinPage__header-coin-info">
        <p>Market Cap: {{coin.market_data.market_cap.usd.toLocaleString() }} $</p>
        <p>Trading Volume: {{coin.market_data.total_volume.usd}} $</p>
        <p>Fully Diluted Valuation: {{fullDillutedValuation.toLocaleString()}} $</p>
      </div>
    </div>
   <div class="coinPage__header-info">
     <p>Circulating Supply: {{coin.market_data.circulating_supply.toLocaleString() }} $</p>
     <p>Max Supply: {{coin.market_data.max_supply.toLocaleString()}} $</p>
     <p>Max Price(24h): {{coin.market_data.high_24h.usd.toLocaleString()}} $</p>
   </div>
    <div class="coinPage__header-infoCommunity">
    <span id="tittle">Info</span>
      <p>Website: <a>{{coin.links.homepage[0]}}</a></p>
      <p>Redit: <a>{{coin.links.subreddit_url}}</a></p>
      <p>Blockchain: </p><ul>
      <li><a>{{coin.links.blockchain_site[0]}}</a></li>
      <li><a>{{coin.links.blockchain_site[1]}}</a></li>
      <li><a>{{coin.links.blockchain_site[2]}}</a></li>
    </ul>
    </div>
  </div>


</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
@Component
export default class coinPage extends Vue{

  @Action
  public getCoin!: (id:string) =>Promise<void>

  @Getter
  public coin!:any
  async created(){
  await this.getCoin(this.$route.params.id)
  }

  get colorOfChange():string{
    if(this.coin.market_data.price_change_percentage_24h_in_currency.usd>0){
      return 'color:green'
    }
    return 'color:red'
  }
  get fullDillutedValuation():number{
    return this.coin.market_data.current_price.usd * this.coin.market_data.max_supply
  }
};
</script>

<style scoped>

</style>