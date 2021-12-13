 <template>
<div class="coinPage">
  <div class="coinPage__header">
    <div class="coinPage__header-coin">
      <img :src="coin.image.small">
      <span id="nameCoin">{{coin.name}}({{coin.symbol}})</span>
      <div class="coinPage__header-coin-price">
        <span id="priceCoin">{{coin.market_data.current_price[`${currency}`].toLocaleString()}}  {{ currency.toUpperCase() }}</span>
        <span :style="colorOfChange" id="change24h">{{coin.market_data.price_change_percentage_24h_in_currency.usd}}%</span>
      </div>
      <div class="coinPage__header-coin-info">
        <p>Market Cap: {{coin.market_data.market_cap[`${currency}`].toLocaleString() }} {{ currency.toUpperCase() }}</p>
        <p>Trading Volume: {{coin.market_data.total_volume[`${currency}`]}} {{ currency.toUpperCase() }}</p>
        <p>Fully Diluted Valuation: {{fullDillutedValuation.toLocaleString()}} {{ currency.toUpperCase() }}</p>
      </div>
    </div>
   <div class="coinPage__header-info">
     <p>Circulating Supply: {{coin.market_data.circulating_supply.toLocaleString() }} {{ coin.symbol}}</p>
     <p>Max Supply: {{coin.market_data.max_supply.toLocaleString()}} {{ coin.symbol }}</p>
     <p>Max Price(24h): {{coin.market_data.high_24h[`${currency}`].toLocaleString()}} {{  currency.toUpperCase() }}</p>
   </div>
    <div class="coinPage__header-infoCommunity">
    <span id="tittle">Info</span>
      <p>Website: <a  target="_blank" :href="coin.links.homepage[0]">{{coin.links.homepage[0]}}</a></p>
      <p>Redit: <a :href="coin.links.subreddit_url" target="_blank">  {{coin.links.subreddit_url}}</a></p>
      <p>Blockchain: </p><ul>
      <li><a :href="coin.links.blockchain_site[0]"  target="_blank">{{coin.links.blockchain_site[0]}}</a></li>
      <li><a :href="coin.links.blockchain_site[1]"  target="_blank">{{coin.links.blockchain_site[1]}}</a></li>
      <li><a :href="coin.links.blockchain_site[2]"  target="_blank">{{coin.links.blockchain_site[2]}}</a></li>
    </ul>

    </div>
  </div>
  <div class="coinPage__body">
  <div class="coinPage__body-converter">
    <div v-if="stateConverter">
    <a-input :placeholder="currency" v-model="inputAmountCurrency" />
      <i class="fa fa-exchange" aria-hidden="true" @click="stateConverter=!stateConverter"></i>
    <span>{{ coin.name }}: {{calcAmountCoin}}</span>
    </div>
    <div v-else>
    <a-input :placeholder="coin.name" v-model="inputAmountCoin" />
      <i class="fa fa-exchange" aria-hidden="true" @click="stateConverter=!stateConverter"></i>
    <span>{{ currency }}: {{calcAmountCurrency.toLocaleString()}}</span>
    </div>
  </div>
</div>

</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import coin from "@/components/coin.vue";
@Component
export default class coinPage extends Vue{
 public inputAmountCurrency:number|string=''
  public inputAmountCoin:number|string=''
 private stateConverter=true

  @Action
  public getCoin!: (id:string) =>Promise<void>

  @Getter
  public coin!:any
  @Getter
  public currency!:string
  async created(){
  await this.getCoin(this.$route.params.id)
  }

  get calcAmountCoin():number{
   return +this.inputAmountCurrency/ this.coin.market_data.current_price[`${this.currency}`]
  }
  get calcAmountCurrency():number{
   return +this.inputAmountCoin * this.coin.market_data.current_price[`${this.currency}`]
  }

  get colorOfChange():string{
    if(this.coin.market_data.price_change_percentage_24h_in_currency[`${this.currency}`]>0){
      return 'color:green'
    }
    return 'color:red'
  }
  get fullDillutedValuation():number{
    return this.coin.market_data.current_price.usd * this.coin.market_data.max_supply
  }
}
</script>

<style scoped>

</style>