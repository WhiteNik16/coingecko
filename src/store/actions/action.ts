import { api } from "@/api/config";
import { ActionContext } from "vuex";
import { AxiosError } from "axios";
import { IResponseError } from "@/api/types/types";

export default {
  setCurrency({commit, dispatch}: ActionContext<any, any>, currency: string):void {
    commit('SET_CURRENCY', currency)
    dispatch('getCoins',currency)

  },

  async getCoins({ commit }: ActionContext<any, any>, currency: string ): Promise<void> {
    try {
      const response = await api.get("/coins/markets", {
        params: {
          vs_currency: currency,
          order: "market_cap_desc",
          per_page: 20,
          page: 1,
          sparkline: false
        }
      });
      const coins:Array<any> = response.data;
      console.log(coins);
      commit('SET_COINS', coins)
    } catch (error) {
      const err = error as AxiosError<IResponseError>
      console.log(err.response?.data)
    }
  },
  async getCoin({ commit }: ActionContext<any, any>, id: string ): Promise<void> {
    try {
      const response = await api.get(`/coins/${id}`, {
        params: {
          localization: true,
          tickers: true,
          market_data: true,
          community_data: true,
          developer_data: true,
          sparkline: true
        }
      });
      const coin:Array<any> = response.data;
      console.log(coin);
      commit('SET_COIN', coin)
    } catch (error) {
      const err = error as AxiosError<IResponseError>
      console.log(err.response?.data)
    }
  }

}