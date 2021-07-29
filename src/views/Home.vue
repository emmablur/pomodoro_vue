<template>
  <div class="wrap">
    <!-- sidebar -->
    <side-bar/>
    <!-- main -->
    <div class="main">
      <div class="main_title">
        <span>Focus Time</span>
        <button @click.prevent="addProjectBoard = !addProjectBoard">NEW PROJECT</button>
      </div>
      <div class="focus_board">
        <!-- timer -->
        <timer/>
        <div class="time_record">
          <div class="record_title">
            <span>Today</span>
            <button>More</button>
          </div>
          <div class="record_time">2h 5min</div>
        </div>
      </div>
      <div class="task_board">
        <!-- todo project -->
        <todo-project v-for="index in projectIndex" :key="index"
        :project="projects[index]" :projectIndex="index"/>
        <!-- done project -->
        <div class="done_project">
          <div class="done_title">DONE</div>
          <div class="done_list">
            <div class="done_item">A/B test</div>
            <div class="done_item">Market Research</div>
          </div>
        </div>
      </div>
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
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import sideBar from '@/components/SideBar.vue';
import timer from '@/components/Timer.vue';
import todoProject from '@/components/TodoProject.vue';

export default {
  name: 'Home',
  data() {
    return {
      addProjectBoard: false,
      schema: {
        projectName: 'required',
        color: 'required',
      },
    };
  },
  computed: {
    ...mapState(['projects']),
    ...mapGetters(['projectIndex']),
  },
  components: {
    sideBar,
    timer,
    todoProject,
  },
  methods: {
    addProject(values, resetForm) {
      const payload = {
        tasks: [],
        done_pomodoro: 0,
        ...values,
      };
      this.$store.commit('addProject', payload);
      this.addProjectBoard = false;
      resetForm();
    },
  },
};
</script>
