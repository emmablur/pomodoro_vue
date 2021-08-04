<template>
  <div class="bar_item">
    <div class="bar">
      <span></span>
    </div>
    <div class="bar_info">
      <div class="date">
        <div>{{weekdayName[date.getDay()]}}</div>
        <div>{{`${date.getMonth()+1}/${date.getDate()}`}}</div>
      </div>
      <div class="projects">
        <span v-for="color in day.projectList" :key="color"
        :style="{'background-color':color}"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['day'],
  data() {
    return {
      weekdayName: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    };
  },
  computed: {
    barHeight() {
      return `${(this.day.pomodoro / 20) * 100}%`;
    },
    date() {
      return new Date(this.day.time);
    },
  },
};
</script>

<style lang="scss" scoped>
.bar > span{
  // height: v-bind('barHeight');
  animation: show 0.25s forwards;
  @keyframes show {
    from{
      height: 0%;
    }
    to{
      height: v-bind('barHeight');
    }
  }
}
</style>
