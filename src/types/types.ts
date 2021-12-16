export enum ECurrency {
  usd = "usd",
  eur = "eur",
  uah = "uah",
}
export type Currency = keyof typeof ECurrency;

export interface ICoin {
  id: string;
  image: Record<string, string> | string;
  market_data: Record<string, any>;
  [k: string]: any;
}
export type ICoins = ICoin[];

export interface IState {
  coinsForSearch: ICoins | null;
  coin: ICoin | null;
  coins: ICoins | null;
  currency: Currency;
}
