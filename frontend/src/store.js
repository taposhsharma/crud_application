import { createStore } from 'vuex';

const store = createStore({
  state: {
    componentAState: ''
  },
  mutations: {
    setComponentAState(state, payload) {
      state.componentAState = payload;
    }
  },
  actions: {
    updateComponentAState({ commit }, payload) {
      commit('setComponentAState', payload);
    }
  }
});


export default store