import { createStore } from 'vuex';

export default createStore({
  state: {
    playing: false,
    time: [25, 0, 0], // 還剩下多少時間?
    timestamp: 0, // 開始時的時間?
  },
  mutations: {
    togglePlaying(state) {
      state.playing = !state.playing;
    },
    updateTimestamp(state, payload) {
      state.timestamp = payload;
    },
    updateTime(state, payload) { // payload = 經過的時間
      state.time[2] += payload / 10;
      if (state.time[2] >= 100) {
        state.time[1] -= 1;
        state.time[2] -= 100;
      }
      if (state.time[1] < 0) {
        state.time[1] += 60;
        state.time[0] -= 1;
      }
    },
  },
  actions: {
    startTimer({ commit, dispatch }) {
      commit('updateTimestamp', performance.now());
      commit('togglePlaying');
      dispatch('progress');
    },
    pauseTimer({ commit }) {
      commit('updateTimestamp', 0);
      commit('togglePlaying');
    },
    progress({ state, commit, dispatch }) {
      if (!state.playing) return;
      commit('updateTime', performance.now() - state.timestamp);
      commit('updateTimestamp', performance.now());
      requestAnimationFrame(() => {
        dispatch('progress');
      });
    },
  },
  getters: {
    // format time
    time(state) {
      return `${(state.time[0].toString().length < 2) ? '0' : ''}${state.time[0]}:${(state.time[1].toString().length < 2) ? '0' : ''}${state.time[1]}`;
    },
  },
});
