
export default {
SET_COINS:(state:any, coins:Array<any>) =>{
  state.coins=coins
  
},
  SET_COIN:(state:any, coin:Array<any>) =>{
  state.coin = coin
},
  SET_CURRENCY:(state:any, currency:string) =>{
  state.currency=currency
  },

}