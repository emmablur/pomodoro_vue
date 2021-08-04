<template>
  <div class="graph_item">
    <div class="graph_item_name">
      {{item.taskName}}
    </div>
    <div class="graph_item_line_wrap">
      <div class="graph_item_line">
        <span></span>
        <div class="graph_item_time">
          {{item.donePomodoro}}個
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'color', 'maxPomodoroCount'],
  computed: {
    graphItemWidth() {
      return `${(this.item.donePomodoro / this.maxPomodoroCount) * 100}%`;
    },
  },
};
</script>

<style lang="scss" scoped>

.graph_item_line{
    animation: showUp 0.25s forwards;

    @keyframes showUp {
      from{
        width: 0%;
      }
      to{
        width: v-bind('graphItemWidth');
      }
    }
    >span{
      background: transparent
                    linear-gradient(270deg, v-bind('color') 0%, #fbc2eb1a 100%) 0% 0%
                    no-repeat padding-box;
    }
}
</style>
