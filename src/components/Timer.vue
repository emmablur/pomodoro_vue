<template>
  <div class="timer">
    <div class="clock">
      <div>03:13</div>
    </div>
    <div class="current_task_wrap">
      <div class="current_task">
        <div class="task_title">Front end</div>
        <div class="task_pomodoro">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="task_button">PAUSE</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timer',
  data() {
    return {
      playing: false,
    };
  },
};
</script>
