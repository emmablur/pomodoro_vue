<template>
  <div class="todo_project">
    <div class="todo_title_wrap">
      <div class="todo_title_name" @click.prevent="open = !open">
        <div>{{project.projectName}}</div>
        <div class="todo_add_icon">
          <span class="material-icons">add</span>
        </div>
      </div>
      <form class="todo_add_board" v-show="open">
        <div>
          <label>名稱</label><input type="text" class="add_name">
        </div>
        <div>
          <label>番茄數</label><input type="number" class="add_pomodoro">
        </div>
        <button>+</button>
      </form>
    </div>
    <div class="todo_list">
      <todo-item v-for="task in project.tasks" :key="task.name" :task="task"/>
    </div>
  </div>
</template>

<script>
import todoItem from './TodoItem.vue';

export default {
  name: 'todoProject',
  props: ['project'],
  data() {
    return {
      open: false,
    };
  },
  components: {
    todoItem,
  },
};
</script>
