<template>
  <div class="todo_project">
    <div class="todo_title_wrap">
      <span class="todo_title_dec"></span>
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
        <div class="task_add_button">
          <span @click.prevent="confirmDeleteProject">刪除專案</span>
          <button>新增任務</button>
        </div>
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
import { mapMutations } from 'vuex';
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
      const activeTask = this.project.tasks.filter((task) => !task.done);
      return activeTask.map((task) => this.project.tasks.indexOf(task));
    },
  },
  components: {
    todoItem,
  },
  methods: {
    ...mapMutations(['deleteProject']),
    addTask(values, { resetForm }) {
      console.log(values);
      const payload = {
        projectIndex: this.projectIndex,
        task: {
          name: values.name,
          pomodoro: parseFloat(values.pomodoro),
          done_pomodoro: [],
          done: false,
        },
      };
      console.log(payload);
      this.$store.commit('addTask', payload);
      this.open = false;
      resetForm();
    },
    confirmDeleteProject() {
      // eslint-disable-next-line no-restricted-globals
      if (confirm(`要刪除 ${this.project.projectName} 專案嗎?`)) {
        this.deleteProject(this.projectIndex);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.todo_title_wrap{
  .todo_title_dec {
    background-color: v-bind('project.color');
  }
}
</style>
