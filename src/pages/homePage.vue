<template>
  <div class="homePage" v-if="coins">
    <div class="coins-header">
      <div class="coin">
        <div class="coin__name"><span>Name</span></div>
        <div class="coin__price">Price</div>
        <div class="coin__change_24h">Price change 24h</div>
        <div class="coin__total-volume">Total volume</div>
        <div class="coin__change_market-cap">Market cap</div>
      </div>
    </div>

    <v-coin v-for="coin in coins" :key="coin.id" :coin="coin" @transitionToPage="transitionToPage"></v-coin>
  </div>
  <a-skeleton v-else />
</template>

<script lang="ts">
import { api } from "@/api/config";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import vCoin from "@/components/coin.vue";
@Component({
  components:{
    vCoin,
  }
})
export default class homePage extends Vue {



  @Action
  public getCoins!: (currency:string) =>Promise<void>

  @Getter
  public coins!:any
  @Getter
  public currency!:string




  public transitionToPage(coin: Record<string, any>): void {
    let data = coin.id
    this.$router.push({ name: 'coinPage', params: { id: data } })
  }
  async mounted() {
    await this.getCoins('usd');

  }






}
</script>

<style scoped>

</style>