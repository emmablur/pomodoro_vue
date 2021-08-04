<template>
  <div class="todo_item">
    <div class="item_title_wrap" @click.prevent="open = !open">
      <div class="item_title">{{task.name}}</div>
      <div class="item_pause">
        <span class="material-icons"
        @click.stop="clickButton"
        v-text="(isCurrentTask&&playing)?'pause_circle_outline':'play_circle_outline'">
        </span>
      </div>
    </div>
    <div class="item_checker" v-show="open">
      <div class="checker_pomodoro">
        <span v-for="n in task.done_pomodoro.length"
        :key="n" :style="{'background-color':color}"></span>
        <span v-for="n in task.pomodoro" :key="n"></span>
      </div>
      <span class="material-icons" @click="doneTask({projectIndex,taskIndex})"> done </span>
      <span class="material-icons" @click="deleteTask({projectIndex,taskIndex})"> close </span>
    </div>
  </div>
</template>

<script>
import {
  mapMutations, mapState, mapActions, mapGetters,
} from 'vuex';

export default {
  name: 'todoItem',
  props: ['task', 'projectIndex', 'taskIndex', 'color'],
  data() {
    return {
      open: false,
    };
  },
  computed: {
    ...mapState(['currentTaskIndex', 'playing', 'work_time']),
    ...mapGetters(['clockDeg']),
    isCurrentTask() {
      if (!this.currentTaskIndex) return false;
      if (
        this.projectIndex === this.currentTaskIndex.projectIndex
         && this.taskIndex === this.currentTaskIndex.taskIndex) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapMutations(['doneTask', 'deleteTask', 'setCurrentTask', 'togglePlaying', 'resetTime', 'setIsBreak']),
    ...mapActions(['startTimer', 'pauseTimer']),
    clickButton() {
      if (!this.currentTaskIndex) { // 如果currentTask尚無
        const payload = {
          projectIndex: this.projectIndex,
          taskIndex: this.taskIndex,
        };
        this.setCurrentTask(payload);
        this.resetTime(this.work_time);
        this.setIsBreak(false);
      } else if (this.isCurrentTask) { // 如果這個任務是currentTask
        if (this.playing) {
          this.pauseTimer();
        } else {
          this.startTimer();
        }
      } else if (
        this.clockDeg === '0deg'
        // eslint-disable-next-line no-restricted-globals
        || confirm('當前計時會喪失，要更換任務嗎?')) {
        const payload = {
          projectIndex: this.projectIndex,
          taskIndex: this.taskIndex,
        };
        this.setCurrentTask(payload);
        this.resetTime(this.work_time);
        this.setIsBreak(false);
      }
    },
  },

};
</script>
