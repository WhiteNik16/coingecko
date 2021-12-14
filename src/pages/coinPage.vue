 <template>
<div class="coinPage">
  <div class="coinPage__header">
    <div class="coinPage__header-coin">
      <img :src="coin.image.small">
      <span id="nameCoin">{{coin.name}}({{coin.symbol}})</span>
      <div class="coinPage__header-coin-price">
        <span id="priceCoin">{{ coin.market_data.current_price[`${currency}`].toFixed(amountDecimalsPlaces) }}  {{ currency.toUpperCase()
          }}</span>
        <span :style="changeOfColor" id="change24h">{{coin.market_data.price_change_percentage_24h_in_currency.usd}}%</span>
      </div>
      <div class="coinPage__header-coin-info">
        <p v-if="coin.market_data.market_cap">Market Cap: {{coin.market_data.market_cap[`${currency}`].toLocaleString() }} {{ currency.toUpperCase() }}</p>
        <p v-if="coin.market_data.total_volume">Trading Volume: {{coin.market_data.total_volume[`${currency}`].toLocaleString()}} {{ currency.toUpperCase() }}</p>
        <p v-if="fullDillutedValuation">Fully Diluted Valuation: {{fullDillutedValuation.toLocaleString()}} {{ currency.toUpperCase() }}</p>
      </div>
    </div>
   <div class="coinPage__header-info">
     <p v-if="coin.market_data.circulating_supply" >Circulating Supply: {{coin.market_data.circulating_supply.toLocaleString() }} {{ coin.symbol}}</p>
     <p v-if="coin.market_data.max_supply">Max Supply: {{coin.market_data.max_supply.toLocaleString()}} {{ coin.symbol }}</p>
     <p v-if="coin.market_data.high_24h">Max Price(24h): {{coin.market_data.high_24h[`${currency}`].toFixed(amountDecimalsPlaces).toLocaleString()}} {{  currency.toUpperCase() }}</p>
   </div>
    <div class="coinPage__header-infoCommunity" v-if="coin.links">
    <span id="tittle">Info</span>
      <p>Website: <a  target="_blank" :href="coin.links.homepage[0]">{{coin.links.homepage[0]}}</a></p>
      <p>Redit: <a :href="coin.links.subreddit_url" target="_blank">  {{coin.links.subreddit_url}}</a></p>
      <p>Blockchain: </p><ul>
      <li><a  :href="coin.links.blockchain_site[0]"  target="_blank">{{coin.links.blockchain_site[0]}}</a></li>
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
     <div class="coinPage__body-chart">
       <div :style="{ marginTop: '16px' }">
         <a-radio-group v-model="amountDays"  default-value="30" size="small">
           <a-radio-button value="7">
             7 days
           </a-radio-button>
           <a-radio-button value="30">
             30 days
           </a-radio-button>
           <a-radio-button value="90">
             90 days
           </a-radio-button>
         </a-radio-group>
       </div>
       <lineChart v-if="data" :chartData="data"/>
     </div>

  </div>
</div>
</template>

<script lang="ts">
import lineChart from '@/components/lineChart.vue'
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { convertTimestamp } from '@/helpers/timeHelper.ts'
import coin from "@/components/coin.vue";
import { api } from "@/api/config";
@Component({
  components:{
    lineChart
  }
})
export default class coinPage extends Vue{
  @Action
  public getCoin!: (id:string) =>Promise<void>

  @Getter
  public coin!:any

  @Getter
  public currency!:string

  public inputAmountCurrency:number|string=''
  public inputAmountCoin:number|string=''
 private stateConverter=true
  public statisticValueCoin:any=null
  public amountDays=30
  public data:any = null


  async created(){
  await this.getCoin(this.$route.params.id)
    this.statisticValueCoin= await api.get(`/coins/${this.coin.id}/market_chart`, {
        params: {
          vs_currency: this.currency,
          days: this.amountDays,
          interval: 'daily'
        }
      }
      )

    this.data={
      labels:this.statisticValueCoin.data.prices.map((e:Array<number>) => convertTimestamp(e[0]) ),
      datasets: [
        {
          label:'Курс'+' '+this.coin.name,
          backgroundColor: '#15bbf1',
          data: this.statisticValueCoin.data.prices.map((e:Array<number>) => e[1] )
        }
      ]
    }
  }
    @Watch('amountDays')
    async editAmountDays(){
      this.statisticValueCoin= await api.get(`/coins/${this.coin.id}/market_chart`, {
          params: {
            vs_currency: this.currency,
            days: this.amountDays,
            interval: 'daily'
          }
        }
      )
      this.data={
        labels:this.statisticValueCoin.data.prices.map((e:Array<number>) => convertTimestamp(e[0]) ),
        datasets: [
          {
            label:'Курс'+' '+this.coin.name,
            backgroundColor: '#15bbf1',
            data: this.statisticValueCoin.data.prices.map((e:Array<number>) => e[1] )
          }
        ]
      }
    }

  get calcAmountCoin():number{
   return +this.inputAmountCurrency/ this.coin.market_data.current_price[`${this.currency}`]
  }
  get calcAmountCurrency():number{
   return +this.inputAmountCoin * this.coin.market_data.current_price[`${this.currency}`]
  }

  get amountDecimalsPlaces():number{
    if(this.coin.market_data.current_price[this.currency] > 0.99){
      return 3
    }
    return 6
  }

  get changeOfColor():string{
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