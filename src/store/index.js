import { createStore } from 'vuex';

const LS = {
  load() {
    return JSON.parse(localStorage.getItem('pomodoroTodo') || null);
  },
  save(val) {
    localStorage.setItem('pomodoroTodo', JSON.stringify(val));
  },
};

export default createStore({
  state: {
    projects: [{
      tasks: [{
        name: 'Mockup', pomodoro: 2, done_pomodoro: [], done: false,
      }, {
        name: 'Wireframe', pomodoro: 4, done_pomodoro: [], done: false,
      }, {
        name: 'UI flow', pomodoro: 4, done_pomodoro: [], done: false,
      }, {
        name: 'Function map', pomodoro: 2, done_pomodoro: [], done: false,
      }, {
        name: 'A/B test', pomodoro: 1, done_pomodoro: [], done: false,
      }],
      projectName: 'DESIGN',
      color: '#fbc2eb',
    }, {
      tasks: [{
        name: 'Function map', pomodoro: 1, done_pomodoro: [], done: false,
      }, {
        name: 'Back end', pomodoro: 5, done_pomodoro: [], done: false,
      }, {
        name: 'Online meeting', pomodoro: 3, done_pomodoro: [], done: false,
      }],
      projectName: 'CODING',
      color: '#a6c1ee',
    }, {
      tasks: [{
        name: 'Study project',
        pomodoro: 2,
        done_pomodoro: [],
        done: false,
      }, {
        name: 'Home work', pomodoro: 1, done_pomodoro: [], done: false,
      }, {
        name: 'Review class', pomodoro: 2, done_pomodoro: [], done: false,
      }, {
        name: 'Read essay', pomodoro: 4, done_pomodoro: [], done: false,
      }, {
        name: 'Market Research', pomodoro: 1, done_pomodoro: [], done: false,
      }],
      projectName: 'STUDY',
      color: '#abecd6',
    }],
    doneTasks: [],
    playing: false, // 是否在計時
    work_time: [0, 5, 0],
    break_time: [0, 1, 0],
    time: [0, 5, 0],
    timestamp: 0,
    currentTaskIndex: null, // 當前進行的任務
    isBreak: false,
  },
  mutations: {
    togglePlaying(state) {
      state.playing = !state.playing;
    },
    setIsBreak(state, payload) {
      state.isBreak = payload;
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
    resetTime(state, payload) {
      state.time = payload.slice(0); // 作淺拷貝
    },
    setCurrentTask(state, payload) {
      state.currentTaskIndex = payload;
    },
    setProjects(state, payload) {
      state.projects = payload.projects;
      state.doneTasks = payload.doneTasks;
    },
    addTask(state, payload) { // 添加任務
      const { projects, doneTasks } = state;
      projects[payload.projectIndex].tasks.push(payload.task);
      LS.save({ projects, doneTasks });
    },
    addProject(state, payload) { // 添加計畫
      const { projects, doneTasks } = state;
      projects.push(payload);
      LS.save({ projects, doneTasks });
    },
    donePomodoro(state, payload) {
      const { projects, doneTasks } = state;
      const mDay = (payload.mDay) ? payload.mDay : 0;
      if (payload.mDay === undefined) {
        projects[payload.projectIndex].tasks[payload.taskIndex].pomodoro -= 1;
      }

      projects[payload.projectIndex]
        .tasks[payload.taskIndex]
        .done_pomodoro
        .push(Date.now() - 86400000 * mDay);
      LS.save({ projects, doneTasks });
    },
    doneTask(state, payload) {
      const { projects, doneTasks } = state;
      const task = projects[payload.projectIndex].tasks[payload.taskIndex];
      const mDay = (payload.mDay) ? payload.mDay : 0;

      if (state.currentTaskIndex) {
        if (payload.projectIndex === state.currentTaskIndex.projectIndex
        && payload.taskIndex === state.currentTaskIndex.taskIndex) {
          state.currentTaskIndex = null;
        }
      }
      if (!task.done) {
        task.done = true;
        task.doneDate = Date.now() - 86400000 * mDay;
        doneTasks.push({
          projectIndex: payload.projectIndex,
          taskIndex: payload.taskIndex,
          color: projects[payload.projectIndex].color,
        });
      }
      LS.save({ projects, doneTasks });
    },
    deleteTask(state, payload) {
      const { projects, doneTasks } = state;
      state.projects[payload.projectIndex].tasks.splice(payload.taskIndex, 1);
      LS.save({ projects, doneTasks });
    },
    deleteProject(state, payload) {
      state.projects.splice(payload, 1);
      const newDoneTask = [];
      state.projects.forEach((project, projectIndex) => {
        project.tasks.forEach((task, taskIndex) => {
          if (task.done) {
            newDoneTask.push({
              projectIndex,
              taskIndex,
              color: project.color,
            });
          }
        });
      });
      state.doneTasks = newDoneTask;
      const { projects, doneTasks } = state;
      LS.save({ projects, doneTasks });
    },
    resetTask(state, payload) {
      const { projects, doneTasks } = state;
      const task = projects[payload.projectIndex].tasks[payload.taskIndex];
      // reset pomodoro
      task.pomodoro += task.done_pomodoro.length;
      task.done_pomodoro = [];
      // reset done
      task.done = false;
      // delete item in doneTasks
      doneTasks.splice(doneTasks.indexOf(payload), 1);
      LS.save({ projects, doneTasks });
    },
  },
  actions: {
    initProjects({ commit, state }) { // 初始化所有任務等等, 從localStorage
      const { projects, doneTasks } = state;
      LS.save({ projects, doneTasks }); // 先帶入預設資料
      // if (LS.load() === null) {
      //   LS.save({ projects, doneTasks }); // 先帶入預設資料
      // }
      commit('setProjects', LS.load());
      const countPomodoro = [5, 8, 12, 18, 10, 5, 10];
      const countProject = [0, 1, 2, 0, 1, 2, 1];
      for (let i = 0; i <= 6; i += 1) {
        for (let j = 0; j < countPomodoro[i]; j += 1) {
          commit('donePomodoro', {
            projectIndex: countProject[i],
            taskIndex: 0,
            mDay: i,
          });
        }
        commit('doneTask', {
          projectIndex: countProject[i],
          taskIndex: 0,
          mDay: i,
        });
      }
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
    doneTimer({ state, commit, getters }) { // 結束計時
      if (!state.isBreak)commit('donePomodoro', getters.currentTask);
      if (getters.currentTask.pomodoro === 0) { // done task
        commit('doneTask', getters.currentTask);
        commit('setCurrentTask', null);
        commit('resetTime', state.work_time);
      } else { // enter to break time
        if (state.isBreak) {
          commit('setIsBreak', false);
        } else {
          commit('setIsBreak', true);
        }
        commit('resetTime', (state.isBreak) ? state.break_time : state.work_time);
      }
    },
    progress({ state, commit, dispatch }) {
      if (!state.playing) return;
      if (state.time[0] === 0 && state.time[1] === 0) {
        commit('togglePlaying');
        dispatch('doneTimer');
        return;
      }
      commit('updateTime', performance.now() - state.timestamp);
      commit('updateTimestamp', performance.now());
      requestAnimationFrame(() => {
        dispatch('progress');
      });
    },
  },
  getters: {
    time(state) { // format time
      return `${(state.time[0].toString().length < 2) ? '0' : ''}${state.time[0]}:${(state.time[1].toString().length < 2) ? '0' : ''}${state.time[1]}`;
    },
    currentTask(state) {
      if (state.currentTaskIndex === null) return {};
      const { projectIndex, taskIndex } = state.currentTaskIndex;
      const task = state.projects[projectIndex].tasks[taskIndex];
      const { color } = state.projects[projectIndex];
      return {
        projectIndex, taskIndex, color, ...task,
      };
    },
    projectIndex(state) {
      return state.projects.map((project) => state.projects.indexOf(project));
    },
    clockDeg(state) {
      // 經過的秒數
      const nowTime = (state.isBreak) ? state.break_time : state.work_time;
      const totalTime = (nowTime[0] * 60 + nowTime[1]) * 100; // 毫秒
      const pass = totalTime - (state.time[0] * 60 + state.time[1]) * 100 + state.time[2];
      const passDeg = (pass / (totalTime)) * 360;
      return `${passDeg}deg`;
    },
    DoneTaskCount(state) {
      const currentTime = new Date(Date.now());
      const tomorrow = new Date(currentTime.getFullYear(),
        currentTime.getMonth(), currentTime.getDate() + 1);
      const today = new Date(currentTime.getFullYear(),
        currentTime.getMonth(), currentTime.getDate());
      let DonePomodoroCount = 0; // 今天完成的pomodoro總數

      state.projects.forEach((project) => {
        project.tasks.forEach((task) => {
          task.done_pomodoro.forEach((ptime) => {
            if (ptime > today && ptime < tomorrow) {
              DonePomodoroCount += 1;
            }
          });
        });
      });
      return DonePomodoroCount;
    },
    todayTimestamp() {
      const currentTime = new Date(Date.now());
      return new Date(currentTime.getFullYear(),
        currentTime.getMonth(), currentTime.getDate());
    },
  },
});
