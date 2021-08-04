<template>
  <div class="timer">
    <div class="clock">
      <div>{{time}}</div>
    </div>
    <div class="current_task_wrap">
      <div class="current_task">
        <div class="task_title" v-text="(currentTask.name)? currentTask.name : '請選擇任務'"></div>
        <div class="task_pomodoro">
          <template  v-if="currentTask.name">
           <span v-for="n in currentTask.done_pomodoro.length"
          :key="n" :style="{'background-color':currentTask.color}"></span>
          <span v-for="n in currentTask.pomodoro" :key="n"></span>
          </template>
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
      work_color: ['#FBC2EB', '#82AAED'],
      break_color: ['#FBED96', '#9BDEC8'],
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
      conic-gradient(
      transparent 0deg,
      transparent v-bind('clockDeg'),
      v-bind('nowColor[0]') v-bind('clockDeg'),
      v-bind('nowColor[1]') 360deg),
      #F0F0F0;
    }
  }
</style>
