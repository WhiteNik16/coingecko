import Vue from "vue";
import Vuex from "vuex";
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/action'
import { ECurrency, IState } from "@/types/types";

Vue.use(Vuex);

export default new Vuex.Store<IState>({
  state:{
    coins:null,
    coin:null,
    currency:ECurrency.usd,
  },
  actions,
  mutations,
  getters,
});
