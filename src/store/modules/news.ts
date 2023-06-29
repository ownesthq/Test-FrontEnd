import { Article } from '@/plugins/article';
import { Dispatch, Commit } from 'vuex';

import axios from 'axios';

interface NewsState {
  news: Article[]
}
export default {
  namespaced: true,
  state: {
    news: [],
  },
  getters: {
  },
  mutations: {
    saveNews(state: NewsState, news: Article[]) {
      state.news = news;
    },
  },
  actions: {
    async fetchNews({ commit }: any) {
      axios.get('https://min-api.cryptocompare.com/data/v2/news/?lang=EN')
        .then((res: any) => {
          commit('saveNews', res.data.Data);
          console.log({ res });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    async getNews({ state, dispatch }: any) {
      await dispatch('fetchNews');
      return state.news;
    },
  },
  modules: {
  },
};
