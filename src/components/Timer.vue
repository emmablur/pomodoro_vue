<template>
  <div class="timer">
    <div class="clock">
      <div>{{time}}</div>
    </div>
    <div class="current_task_wrap">
      <div class="current_task">
        <div class="task_title">Front end</div>
        <div class="task_pomodoro">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="task_button" @click.prevent="(playing)? pauseTimer() : startTimer()">
          {{(playing)?'PAUSE':'START'}}
          </div>
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
    ...mapState(['playing']),
    ...mapGetters(['time']),
  },
  methods: {
    ...mapMutations(['togglePlaying']),
    ...mapActions(['pauseTimer', 'startTimer']),
  },
};
</script>
