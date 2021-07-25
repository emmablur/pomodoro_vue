<template>
  <div class="todo_project">
    <div class="todo_title_wrap">
      <div class="todo_title">DESIGN</div>
      <div class="todo_add">
        <span class="material-icons">add</span>
      </div>
    </div>
    <div class="todo_list">
      <todo-item/>
      <todo-item/>
    </div>
  </div>
</template>

<script>
import todoItem from './TodoItem.vue';

export default {
  name: 'todoProject',
  components: {
    todoItem,
  },
};
</script>
