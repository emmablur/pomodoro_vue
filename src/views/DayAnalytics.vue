<template>
  <div class="analytics_board">
    <div class="day_graph">
      <day-graph-item
      v-for="(value,index) in daySummary.todayDonePomodoro"
      :key="index" :item="value" :color="value.color"
      :maxPomodoroCount="daySummary.maxPomodoroCount"/>
    </div>
    <div class="day_summary">
      <div class="summary_item">
        <div class="title">
          Pomodoro
        </div>
        <div class="content">
          {{daySummary.DonePomodoroCount}}
        </div>
      </div>
      <div class="summary_item">
        <div class="title">
          Task
        </div>
        <div class="content">
          {{daySummary.DoneTaskCount}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DayGraphItem from '../components/DayGraphItem.vue';

export default {
  computed: {
    ...mapState(['projects']),
    daySummary() {
      const currentTime = new Date(Date.now());
      const tomorrow = new Date(currentTime.getFullYear(),
        currentTime.getMonth(), currentTime.getDate() + 1);
      const today = new Date(currentTime.getFullYear(),
        currentTime.getMonth(), currentTime.getDate());
      const todayDonePomodoro = [];// 有完成pomodoro的任務
      let DoneTaskCount = 0; // 今天完成的任務總數
      let DonePomodoroCount = 0; // 今天完成的pomodoro總數
      let maxPomodoroCount = 0;// 花費最大pomodoro的任務是幾個pomodoro

      this.projects.forEach((project) => {
        project.tasks.forEach((task) => {
          let pomodoroCount = 0;
          task.done_pomodoro.forEach((ptime) => {
            if (ptime > today && ptime < tomorrow) {
              pomodoroCount += 1;
              DonePomodoroCount += 1;
            }
          });
          if (pomodoroCount > 0) {
            if (pomodoroCount > maxPomodoroCount) {
              maxPomodoroCount = pomodoroCount;
            }
            todayDonePomodoro.push({
              taskName: task.name,
              donePomodoro: pomodoroCount,
              color: project.color,
            });
          }
          if (task.done) {
            if (task.doneDate > today && task.doneDate < tomorrow) DoneTaskCount += 1;
          }
        });
      });

      return {
        todayDonePomodoro,
        DoneTaskCount,
        DonePomodoroCount,
        maxPomodoroCount,
      };
    },
  },
  components: {
    DayGraphItem,
  },
};
</script>
