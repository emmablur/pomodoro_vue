<template>
  <div class="analytics_board">
    <div class="day_graph">
      <day-graph-item v-for="n in 10" :key="n"/>
    </div>
    <div class="day_summary">
      <div class="summary_item">
        <div class="title">
          Time
        </div>
        <div class="content">
          9h 13min
        </div>
      </div>
      <div class="summary_item">
        <div class="title">
          Done
        </div>
        <div class="content">
          3
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DayGraphItem from '../components/DayGraphItem.vue';

export default {
  components: {
    DayGraphItem,
  },
};
</script>
