export enum ECurrency {
  usd,
  eur,
  uah,
 }

 export interface ICoin{
   id:string
   image:Record<string, string> | string
   market_data:Record<string, any>
   [k:string]: any
 }
 export interface ICoins extends Array<ICoin>{
  [k:string]:any
 }
 export interface IState{
  coin:ICoin | null
  coins:ICoins | null
  currency:string
 }

