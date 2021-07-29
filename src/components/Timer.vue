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
          :key="n" :style="{'background-color':color}"></span>
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
  computed: {
    ...mapState(['playing', 'currentTask']),
    ...mapGetters(['time']),
  },
  methods: {
    ...mapMutations(['togglePlaying']),
    ...mapActions(['pauseTimer', 'startTimer']),
  },
};
</script>
