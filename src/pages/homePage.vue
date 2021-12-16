<template>
  <div class="homePage" v-if="coins">
    <div class="coins-header">
      <div class="coins-header__search">
        <span>Search coin: </span
        ><a-input placeholder="Bitcoin" type="text" v-model="searchValue" />
        <select-node class="coins-header__select" v-if="searchValue">
          <option
            @click="$router.push({ name: 'coinPage', params: { id: coin.id } })"
            v-for="coin in listCoins.slice(0, 20)"
            :key="coin.id"
          >
            {{ coin.name }}
          </option>
        </select-node>
      </div>

      <div class="coin">
        <div class="coin__name">
          <span>Name</span>
        </div>
        <div class="coin__price">Price</div>
        <div class="coin__change_24h">Price change 24h</div>
        <div class="coin__total-volume">Total volume</div>
        <div class="coin__change_market-cap">Market cap</div>
      </div>
    </div>

    <v-coin
      style="position: relative"
      v-for="coin in coins"
      :key="coin.id"
      :coin="coin"
    ></v-coin>
  </div>
  <a-skeleton v-else />
</template>

<script lang="ts">
import { api } from "@/api/config";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import vCoin from "@/components/coin.vue";
import { ICoins } from "@/types/types";
@Component({
  components: {
    vCoin,
  },
})
export default class homePage extends Vue {
  public searchValue = "";

  @Action
  public getCoins!: (currency: string) => Promise<void>;
  @Action
  public getCoinsForSearch!: (currency: string) => Promise<void>;

  @Getter
  public coins!: ICoins;
  @Getter
  public currency!: string;
  @Getter
  public searchCoins!: ICoins;

  get listCoins(): ICoins {
    return this.searchCoins.filter(
      (item) =>
        item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
    );
  }

  async mounted() {
    await this.getCoinsForSearch("usd");
    await this.getCoins("usd");
  }
}
</script>

<style scoped></style>
