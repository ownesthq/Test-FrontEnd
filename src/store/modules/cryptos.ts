import { Crypto } from '@/plugins/crypto';
import { Dispatch, Commit } from 'vuex';

import axios from 'axios';

interface CryptoState {
  cryptos: Crypto[]
}
export default {
  namespaced: true,
  state: {
    cryptos: [],
  },
  getters: {
  },
  mutations: {
    formatAndSaveCryptos(state: CryptoState, cryptos: any) {
      // Add name to obj
      Object.keys(cryptos).forEach((crypto) => {
        const obj: any = cryptos[crypto];
        obj.USD.NAME = crypto;
        state.cryptos.push(obj);
      });
    },
  },
  actions: {
    async fetchCryptos({ commit, state }: any) {
      axios.get('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,DOGE,USDT,DASH,XRP,LTC,ETC,USDT,BNB,ADA,UNI,BCH,LINK,SOL,MATIC&tsyms=USD,EUR')
        .then((res: any) => {
          commit('formatAndSaveCryptos', res.data.DISPLAY);
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getCryptos({ commit, state, dispatch }: any) {
      await dispatch('fetchCryptos');
      return state.cryptos;
    },
  },
  modules: {
  },
};
