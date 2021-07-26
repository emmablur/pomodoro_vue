<template>
  <div class="wrap">
    <!-- sidebar -->
    <side-bar/>
    <!-- main -->
    <div class="main">
      <div class="main_title">
        <span>Focus Time</span>
        <button>NEW PROJECT</button>
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
        <todo-project v-for="project in projects" :key="project.projectName" :project="project"/>
        <!-- done project -->
        <div class="done_project">
          <div class="done_title">DONE</div>
          <div class="done_list">
            <div class="done_item">A/B test</div>
            <div class="done_item">Market Research</div>
          </div>
        </div>
      </div>
      <div class="project_add_board">
        <form>
          <label for="">project name</label>
          <input type="text" name="" id="">
          <label for="">color</label>
          <input type="color" name="" id="">
          <button>submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import sideBar from '@/components/SideBar.vue';
import timer from '@/components/Timer.vue';
import todoProject from '@/components/TodoProject.vue';

export default {
  name: 'Home',
  data() {
    return {
      projects: [
        {
          projectName: '生活',
          color: '#01dc8c',
          tasks: [
            {
              name: '擦拭電腦',
              pomodoro: 1,
              done: false,
            },
            {
              name: '看282',
              pomodoro: 2,
              done: false,
            },
          ],
        },
        {
          projectName: '學習',
          color: '#fc',
          tasks: [
            {
              name: '看書',
              pomodoro: 2,
              done: false,
            },
          ],
        },
      ],
    };
  },
  components: {
    sideBar,
    timer,
    todoProject,
  },
};
</script>
