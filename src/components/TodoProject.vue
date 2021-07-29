<template>
  <div class="todo_project">
    <div class="todo_title_wrap">
      <div class="todo_title_name" @click.prevent="open = !open">
        <div>{{project.projectName}}</div>
        <div class="todo_add_icon">
          <span class="material-icons">add</span>
        </div>
      </div>
      <vee-form class="task_add_board" v-show="open" :validation-schema="schema" @submit="addTask" >
        <div>
          <label>名稱</label>
          <error-message name="name" class="error_message"/>
          <vee-field type="text" class="add_name" name="name"/>
        </div>
        <div>
          <label>番茄數</label>
          <error-message name="pomodoro" class="error_message"/>
          <vee-field type="number" class="add_pomodoro" name="pomodoro"/>
        </div>
        <button>+</button>
      </vee-form>
    </div>
    <div class="todo_list">
      <!-- todoitem -->
      <todo-item v-for="index in taskIndex" :key="index"
      :task="project.tasks[index]"
      :projectIndex="projectIndex"
      :taskIndex="index"
      :color="project.color"/>
    </div>
  </div>
</template>

<script>
import todoItem from './TodoItem.vue';

export default {
  name: 'todoProject',
  props: ['project', 'projectIndex'],
  data() {
    return {
      open: false,
      schema: {
        name: 'required',
        pomodoro: 'required|min_value:0',
      },
    };
  },
  computed: {
    taskIndex() {
      return this.project.tasks.map((task) => this.project.tasks.indexOf(task));
    },
  },
  components: {
    todoItem,
  },
  methods: {
    addTask(values, { resetForm }) {
      console.log(values);
      const payload = {
        projectIndex: this.projectIndex,
        done_pomodoro: 0,
        task: {
          name: values.name,
          pomodoro: parseFloat(values.pomodoro),
        },
      };
      console.log(payload);
      this.$store.commit('addTask', payload);
      this.open = false;
      resetForm();
    },
  },
};
</script>

<style lang="scss" scoped>
.todo_title_wrap{
  &::after {
    background-color: v-bind('project.color');
  }
}
</style>
