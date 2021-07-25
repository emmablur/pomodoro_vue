<template>
  <div class="todo_item">
    <div class="item_title_wrap">
      <div class="item_title">Function map</div>
      <div class="item_pause">
        <span class="material-icons"> pause_circle_outline </span>
      </div>
    </div>
    <div class="item_checker">
      <div class="checker_pomodoro">
        <span></span><span></span><span></span><span></span>
      </div>
      <span class="material-icons"> done </span>
      <span class="material-icons"> close </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todoItem',
};
</script>
