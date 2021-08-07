<template>
    <div class="analytics_board">
      <div class="week_graph_wrap">
        <div class="week_graph">
          <div class="bar_item_wrap">
            <!-- GraphItem -->
            <week-graph-item v-for="day in WeekSummary.thisWeek.slice(0).reverse()"
             :key="day" :day="day"/>
          </div>
          <div class="frame_wrap">
            <div class="measure">
              <div>
                <span>20</span>
              </div>
              <div>
                <span>16</span>
              </div>
              <div>
                <span>12</span>
              </div>
              <div>
                <span>8</span>
              </div>
              <div>
                <span>4</span>
              </div>
            </div>
            <div class="frame">

            </div>
          </div>
        </div>
      </div>
      <div class="week_summary">
        <div class="time_summary">
          <div class="summary_item">
            <div class="title">
              Pomodoro
            </div>
            <div class="content">
              {{totalPomodoro}}
            </div>
          </div>
          <div class="summary_item">
            <div class="title">
              Task
            </div>
            <div class="content">
              {{WeekSummary.totalTask}}
            </div>
          </div>
        </div>
        <div class="project_summary">
          <div class="item" v-for="item in singleProjectPomodoro" :key="item">
            <div class="icon" >
              <span :style="{'background-color':item.color}"></span>
            </div>
            <div class="name">{{item.projectName}}</div>
            <div class="time">{{item.pomodoroCount}}個</div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WeekGraphItem from '../components/WeekGraphItem.vue';

export default {
  components: {
    WeekGraphItem,
  },
  computed: {
    ...mapState(['projects']),
    WeekSummary() {
      const currentTime = new Date(Date.now());
      const today = new Date(currentTime.getFullYear(),
        currentTime.getMonth(), currentTime.getDate());
      const thisWeek = [];
      let totalTask = 0;
      for (let i = 0; i < 7; i += 1) {
        thisWeek.push({
          time: today - (86400000 * i),
          pomodoro: 0,
          projectList: new Set(),
        });
      }
      this.projects.forEach((project, projectIndex) => { // project
        project.tasks.forEach((task) => { // task
        // 檢視pomodoro
          task.done_pomodoro.forEach((ptime) => { // done_pomodoro
            for (let i = 0; i < 7; i += 1) {
              if (ptime > thisWeek[i].time && ptime < (thisWeek[i].time + 86400000)) {
                thisWeek[i].pomodoro += 1;
                thisWeek[i].projectList.add(this.projects[projectIndex].color);
              }
            }
          });
          // 檢視task
          if (task.done) {
            if (task.doneDate > thisWeek[6].time
                && task.doneDate < (thisWeek[0].time + 86400000)) {
              totalTask += 1;
            }
          }
        });
      });
      return { thisWeek, totalTask };
    },
    totalPomodoro() {
      let total = 0;
      this.WeekSummary.thisWeek.forEach((item) => { total += item.pomodoro; });
      return total;
    },
    singleProjectPomodoro() {
      const currentTime = new Date(Date.now());
      const today = new Date(currentTime.getFullYear(),
        currentTime.getMonth(), currentTime.getDate()).getTime();
      const arr = [];
      this.projects.forEach((project) => {
        let sum = 0;
        project.tasks.forEach((task) => {
          task.done_pomodoro.forEach((ptime) => {
            if (ptime > (today - 86400000 * 6) && ptime < (today + 86400000)) {
              sum += 1;
            }
          });
        });
        arr.push({
          projectName: project.projectName,
          color: project.color,
          pomodoroCount: sum,
        });
      });

      return arr;
    },
  },
};
</script>
