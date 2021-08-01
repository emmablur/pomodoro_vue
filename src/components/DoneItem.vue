<template>
  <div class="done_item">
    <div class="item_title_wrap" @click.prevent="open = !open">
      <div class="item_title">{{task.name}}</div>
      <div class="item_project">
        <span></span>
      </div>
    </div>
    <div class="item_checker" v-show="open">
      <button @click.prevent="resetTask(doneTask)">reset</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'doneItem',
  props: ['doneTask'],
  data() {
    return {
      open: false,
    };
  },
  computed: {
    ...mapState(['projects']),
    task() {
      return this.projects[this.doneTask.projectIndex].tasks[this.doneTask.taskIndex];
    },
  },
  methods: {
    ...mapMutations(['resetTask']),
  },
};
</script>

<style lang="scss" scoped>
  .item_project span {
    background-color: v-bind('doneTask.color');
  }
</style>
