import { createStore } from 'vuex';

const LS = {
  load() {
    return JSON.parse(localStorage.getItem('projects') || '[]');
  },
  save(val) {
    localStorage.setItem('projects', JSON.stringify(val));
  },
};

export default createStore({
  state: {
    projects: [
      {
        projectName: '生活',
        color: '#01dc8c',
        tasks: [
          {
            name: '擦拭電腦',
            pomodoro: 1,
            done_pomodoro: 0,
            done: false,
          },
          {
            name: '看282',
            pomodoro: 2,
            done_pomodoro: 0,
            done: false,
          },
        ],
      },
      {
        projectName: '學習',
        color: '#cb345b',
        tasks: [
          {
            name: '看書',
            pomodoro: 2,
            done_pomodoro: 0,
            done: false,
          },
        ],
      },
    ],
    playing: false, // 是否在計時
    time: [0, 5, 0],
    timestamp: 0,
    currentTask: {}, // 當前進行的任務
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
    setCurrentTask(state, payload) {
      state.currentTask = payload;
    },
    setProjects(state, payload) {
      state.projects = payload;
    },
    addTask(state, payload) { // 添加任務
      state.projects[payload.projectIndex].tasks.push(payload.task);
      LS.save(state.projects);
    },
    addProject(state, payload) { // 添加計畫
      state.projects.push(payload);
      LS.save(state.projects);
    },
    doneTask(state, payload) {
      state.projects[payload.projectIndex].tasks[payload.taskIndex].done = true;
    },
    deleteTask(state, payload) {
      state.projects[payload.projectIndex].tasks.splice(payload.taskIndex, 1);
    },
  },
  actions: {
    initProjects({ commit, state }) { // 初始化所有任務等等, 從localStorage
      LS.save(state.projects); // 先帶入預設資料ㄌ, 待刪
      commit('setProjects', LS.load());
    },
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
      if (state.time[0] === 0 && state.time[1] === 0) {
        console.log('time out');
        commit('togglePlaying');
      }
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
    projectIndex(state) {
      return state.projects.map((project) => state.projects.indexOf(project));
    },
  },
});
