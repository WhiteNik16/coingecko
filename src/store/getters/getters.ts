import { IState } from "@/types/types";

export default {
  searchCoins(state: IState) {
    return state.coinsForSearch;
  },
  coins(state: IState) {
    return state.coins;
  },
  coin(state: any) {
    return state.coin;
  },
  currency(state: any) {
    return state.currency;
  },
  width(state:IState){
    return state.width
  }
};
