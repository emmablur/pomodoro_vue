<template>
<section>
  <div class="main_title">
    <span v-text="(isBreak)? 'Break Time' : 'Focus Time'"></span>
    <button :style="{'background-color':(isBreak)? breakColor : workColor }"
     @click.prevent="addProjectBoard = !addProjectBoard">
     <span class="material-icons">add</span>NEW PROJECT
     </button>
  </div>
  <div class="focus_board">
    <!-- timer -->
    <timer/>
    <div class="time_record">
      <div class="record_title">
        <span>Today</span>
        <router-link custom v-slot="{ navigate }"
        :to="{name:'Analytics'}">
        <button @click="navigate">More</button>
        </router-link>
      </div>
      <div class="record_time">
        <span>{{DoneTaskCount}} <span class="unit">/pomodoro</span></span>
      </div>
    </div>
  </div>
  <div class="task_board">
    <div class="todo_project_wrap">
    <!-- todo project -->
      <todo-project v-for="index in projectIndex" :key="index"
      :project="projects[index]" :projectIndex="index"/>
    </div>
    <!-- done project -->
    <div class="done_project">
      <div class="done_title">DONE</div>
      <div class="done_list">
          <done-item v-for="doneTask in doneTasks.slice(0).reverse()"
            :key="doneTask" :doneTask="doneTask"/>
      </div>
    </div>
  </div>
  <transition name="fade">
    <div class="project_add_board"
    v-if="addProjectBoard"
    @click="addProjectBoard = !addProjectBoard">
      <vee-form :validation-schema="schema"
        @click.stop @submit="addProject">
        <div class="project_add_board_title">新增專案</div>
        <label for="">專案名稱</label>
        <error-message name="projectName" class="error_message"/>
        <vee-field type="text" name="projectName"/>
        <label for="">代表色彩</label>
        <error-message name="color" class="error_message"/>
        <vee-field type="color" name="color" />
        <button>提交</button>
      </vee-form>
    </div>
  </transition>
</section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import timer from '@/components/Timer.vue';
import todoProject from '@/components/TodoProject.vue';
import doneItem from '@/components/DoneItem.vue';

export default {
  name: 'Home',
  data() {
    return {
      addProjectBoard: false,
      schema: {
        projectName: 'required',
        color: 'required',
      },
      breakColor: '#9BDEC8',
      workColor: '#82AAED',
    };
  },
  computed: {
    ...mapState(['projects', 'doneTasks', 'isBreak']),
    ...mapGetters(['projectIndex', 'DoneTaskCount']),
  },
  components: {
    timer,
    todoProject,
    doneItem,
  },
  methods: {
    addProject(values, { resetForm }) {
      const payload = {
        tasks: [],
        ...values,
      };
      this.$store.commit('addProject', payload);
      this.addProjectBoard = false;
      resetForm();
    },
  },
};
</script>

<style>
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active{
  transition: all 0.25s linear;
}
.fade-leave-to {
  transition: all 0.25s linear;
  opacity: 0;
}
</style>
