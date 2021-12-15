import { api } from "@/api/config";
import { ActionContext } from "vuex";
import { AxiosError } from "axios";
import { IResponseError } from "@/api/types/types";
import { Currency, ICoin, ICoins, IState } from "@/types/types";

export default {
  setCurrency({commit, dispatch}: ActionContext<IState, IState>, currency: Currency):void {
    commit('SET_CURRENCY', currency)
    dispatch('getCoins',currency)

  },

  async getCoinsForSearch({ commit }: ActionContext<IState, IState>, currency: Currency ): Promise<void> {
    try {
      const response = await api.get<ICoins>("/coins/markets", {
        params: {
          vs_currency: currency,
          order: "market_cap_desc",
          per_page: 250,
          page: 1,
          sparkline: false
        }
      });
      const coins = response.data;
      console.log(coins);
      commit('SET_COINS_FOR_SEARCH', coins)
    } catch (error) {
      const err = error as AxiosError<IResponseError>
      console.log(err.response?.data)
    }
  },

  async getCoins({ commit }: ActionContext<IState, IState>, currency: Currency ): Promise<void> {
    try {
      const response = await api.get<ICoins>("/coins/markets", {
        params: {
          vs_currency: currency,
          order: "market_cap_desc",
          per_page: 20,
          page: 1,
          sparkline: false
        }
      });
      const coins = response.data;
      console.log(coins);
      commit('SET_COINS', coins)
    } catch (error) {
      const err = error as AxiosError<IResponseError>
      console.log(err.response?.data)
    }
  },
  async getCoin({ commit }: ActionContext<IState, IState>, id: string ): Promise<void> {
    try {
      const response = await api.get<ICoin>(`/coins/${id}`, {
        params: {
          localization: true,
          tickers: true,
          market_data: true,
          community_data: true,
          developer_data: true,
          sparkline: true
        }
      });
      const coin = response.data;
      console.log(coin);
      commit('SET_COIN', coin)
    } catch (error) {
      const err = error as AxiosError<IResponseError>
      console.log(err.response?.data)
    }
  }

}