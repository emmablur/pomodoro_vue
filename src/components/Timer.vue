<template>
  <div class="timer">
    <div class="clock">
      <div>{{time}}</div>
    </div>
    <div class="current_task_wrap">
      <div class="current_task">
        <div class="task_title" v-text="(currentTask.name)? currentTask.name : '請選擇任務<3'"></div>
        <div class="task_pomodoro">
          <span v-for="n in currentTask.done_pomodoro"
          :key="n" :style="{'background-color':currentTask.color}"></span>
          <span v-for="n in currentTask.pomodoro" :key="n"></span>
        </div>
        <button class="task_button" :disabled="!currentTask.name"
        @click.prevent="(playing)? pauseTimer() : startTimer()" >
          {{(playing)?'PAUSE':'START'}}
          </button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapState, mapMutations, mapGetters, mapActions,
} from 'vuex';

export default {
  name: 'timer',
  data() {
    return {
      work_color: ['#9600ff', '#01dc8c'],
      break_color: ['#06857a', '#236842'],
    };
  },
  computed: {
    ...mapState(['playing', 'isBreak']),
    ...mapGetters(['time', 'clockDeg', 'currentTask']),
    nowColor() {
      return (this.isBreak) ? this.break_color : this.work_color;
    },
  },
  methods: {
    ...mapMutations(['togglePlaying']),
    ...mapActions(['pauseTimer', 'startTimer']),
  },
};
</script>

<style lang="scss">
  .timer{
    >.clock{
      background:
      conic-gradient(v-bind('nowColor[0]') 0deg, v-bind('nowColor[1]') v-bind('clockDeg'),
      transparent v-bind('clockDeg'), transparent 360deg),
      #d4d4d4;
    }
  }
</style>
