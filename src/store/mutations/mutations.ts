import { Currency, ICoin, ICoins, IState } from "@/types/types";

export default {
  SET_COINS: (state: IState, coins: ICoins) => {
    state.coins = coins;
  },
  SET_NEW_COINS: (state: IState, coins: ICoins) => {
    state.coins = state.coins?.concat(coins);
  },
  SET_COINS_FOR_SEARCH: (state: IState, coins: ICoins) => {
    state.coinsForSearch = coins;
  },
  SET_COIN: (state: IState, coin: ICoin) => {
    state.coin = coin;
  },
  SET_CURRENCY: (state: IState, currency: Currency) => {
    state.currency = currency;
  },
  SET_WIDTH: (state: IState, isDesktop: boolean) => {
    state.isDesktop = isDesktop;
  }
};
