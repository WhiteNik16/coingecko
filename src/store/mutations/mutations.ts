import { ICoin, ICoins, IState } from "@/types/types";

export default {
SET_COINS:(state:IState, coins:ICoins) =>{
  state.coins=coins
  
},
  SET_COIN:(state:IState, coin:ICoin) =>{
  state.coin = coin
},
  SET_CURRENCY:(state:IState, currency:string) =>{
  state.currency=currency
  },

}