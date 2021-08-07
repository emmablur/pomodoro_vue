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
        name: 'Mockup', pomodoro: 2, done_pomodoro: [1628188723158, 1628188723158], done: false,
      }, {
        name: 'Wireframe', pomodoro: 4, done_pomodoro: [1628275123158, 1628275123158, 1628275123158, 1628188723158, 1628188723158], done: false,
      }, {
        name: 'UI flow', pomodoro: 4, done_pomodoro: [1628361574803, 1628361578234], done: false,
      }, {
        name: 'Function map', pomodoro: 2, done_pomodoro: [1628275123158], done: false,
      }, {
        name: 'A/B test', pomodoro: 0, done_pomodoro: [1628361523158, 1628361526123, 1628361529623], done: true, doneDate: 1628361529624,
      }],
      projectName: 'DESIGN',
      color: '#fbc2eb',
    }, {
      tasks: [{
        name: 'Function map', pomodoro: 1, done_pomodoro: [1628361583519], done: false,
      }, {
        name: 'Back end', pomodoro: 5, done_pomodoro: [1628015923158, 1628015923158, 1628015923158, 1628015923158, 1628015923158], done: false,
      }, {
        name: 'Online meeting', pomodoro: 0, done_pomodoro: [1628361512026, 1628361515609, 1628361518308], done: true, doneDate: 1628361518309,
      }],
      projectName: 'CODING',
      color: '#a6c1ee',
    }, {
      tasks: [{
        name: 'Study project', pomodoro: 2, done_pomodoro: [1628188723158, 1627929523158], done: false,
      }, {
        name: 'Home work', pomodoro: 0, done_pomodoro: [1628361586066, 1628361589681], done: true, doneDate: 1628361589682,
      }, {
        name: 'Review class', pomodoro: 2, done_pomodoro: [1627843123158, 1627843123158], done: false,
      }, {
        name: 'Read essay', pomodoro: 4, done_pomodoro: [1628102323158, 1628102323158, 1628102323158, 1627843123158], done: false,
      }, {
        name: 'Market Research', pomodoro: 0, done_pomodoro: [1628361535939, 1628361539521, 1628361542355, 1627756723158, 1627756723158], done: true, doneDate: 1628361542356,
      }],
      projectName: 'STUDY',
      color: '#abecd6',
    }],
    doneTasks: [{ projectIndex: 1, taskIndex: 2, color: '#a6c1ee' }, { projectIndex: 0, taskIndex: 4, color: '#fbc2eb' }, { projectIndex: 2, taskIndex: 4, color: '#abecd6' }, { projectIndex: 2, taskIndex: 1, color: '#abecd6' }],
    playing: false, // 是否在計時
    work_time: [25, 0, 0],
    break_time: [5, 0, 0],
    time: [25, 0, 0],
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
      projects[payload.projectIndex].tasks[payload.taskIndex].pomodoro -= 1;
      projects[payload.projectIndex].tasks[payload.taskIndex].done_pomodoro.push(Date.now());
      LS.save({ projects, doneTasks });
    },
    doneTask(state, payload) {
      const { projects, doneTasks } = state;
      const task = projects[payload.projectIndex].tasks[payload.taskIndex];
      task.done = true;
      task.doneDate = Date.now();
      if (state.currentTaskIndex) {
        if (payload.projectIndex === state.currentTaskIndex.projectIndex
        && payload.taskIndex === state.currentTaskIndex.taskIndex) {
          state.currentTaskIndex = null;
        }
      }
      doneTasks.push({
        projectIndex: payload.projectIndex,
        taskIndex: payload.taskIndex,
        color: projects[payload.projectIndex].color,
      });
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
      if (LS.load() === null) {
        LS.save({ projects, doneTasks }); // 先帶入預設資料
      }
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
  },
});
