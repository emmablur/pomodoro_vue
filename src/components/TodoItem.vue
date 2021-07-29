<template>
  <div class="todo_item">
    <div class="item_title_wrap" @click.prevent="open = !open">
      <div class="item_title">{{task.name}}</div>
      <div class="item_pause">
        <span class="material-icons" @click.stop="setCurrentTask(task)"> play_circle_outline </span>
      </div>
    </div>
    <div class="item_checker" v-show="open">
      <div class="checker_pomodoro">
        <span v-for="n in task.done_pomodoro" :key="n" :style="{'background-color':color}"></span>
        <span v-for="n in task.pomodoro" :key="n"></span>
      </div>
      <span class="material-icons" @click="doneTask({projectIndex,taskIndex})"> done </span>
      <span class="material-icons" @click="deleteTask({projectIndex,taskIndex})"> close </span>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'todoItem',
  props: ['task', 'projectIndex', 'taskIndex', 'color'],
  data() {
    return {
      open: false,
    };
  },
  methods: {
    ...mapMutations(['doneTask', 'deleteTask', 'setCurrentTask']),
  },

};
</script>
