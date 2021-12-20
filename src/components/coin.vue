<template>
  <div class="coins">
    <div
      class="coin"
      @click="$router.push({ name: 'coinPage', params: { id: coin.id } })"
    >
      <div class="coin__name">
       <span v-if="!isOpenAllFiltersWith"></span> <span>{{ coin.name }}</span
        ><img :src="coin.image" />
      </div>
      <div class="coin__price">
        <span v-if="!isOpenAllFiltersWith">Price: </span>
        {{ coin.current_price.toLocaleString() }} {{ currency.toUpperCase() }}
      </div>
      <div class="coin__change_24h" :style="colorOfChangePrice">
        <span v-if="!isOpenAllFiltersWith">Price change 24h: </span>
        {{ coin.price_change_24h }} {{ currency.toUpperCase() }}
      </div>
      <div class="coin__total-volume">
        <span v-if="!isOpenAllFiltersWith">Total volume: </span>
        {{ coin.total_volume.toLocaleString() }}
      </div>
      <div class="coin__change_market-cap">
        <span v-if="!isOpenAllFiltersWith">Market cap: </span>
        {{ coin.market_cap.toLocaleString() }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { ICoins } from "@/types/types";
@Component
export default class coin extends Vue {
  @Prop() readonly coin: any;

  @Getter
  public coins!: ICoins;
  @Getter
  public currency!: string;

  get colorOfChangePrice(): string {
    if (this.coin.price_change_24h > 0) {
      return "color:green";
    }
    return "color:red";
  }
  get isOpenAllFiltersWith(): boolean {
    console.log(document.documentElement.clientWidth)
    if (document.documentElement.clientWidth <= 768) {
      return false
    }
    return true
  }
}
</script>

<style scoped></style>
