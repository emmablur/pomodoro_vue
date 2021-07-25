<template>
  <div class="wrap">
    <div class="side_bar">
      <div class="title">POMODORO</div>
      <div class="profile">
        <img src="assets/img/TXT_MG_38.jpg" alt="" />
        <div class="profile_name">ben choi</div>
      </div>
      <div class="menu">
        <div class="menu_item">Dashboard</div>
        <div class="menu_item">Analytics</div>
        <div class="menu_item">Ringtones</div>
      </div>
      <div class="login">Sign out</div>
    </div>
    <div class="main">
      <div class="main_title">
        <span>Focus Time</span>
        <button>NEW PROJECT</button>
      </div>
      <div class="focus_board">
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
        <div class="time_record">
          <div class="record_title">
            <span>Today</span>
            <button>More</button>
          </div>
          <div class="record_time">2h 5min</div>
        </div>
      </div>
      <div class="task_board">
        <div class="todo_project">
          <div class="todo_title_wrap">
            <div class="todo_title">DESIGN</div>
            <div class="todo_add">
              <span class="material-icons">add</span>
            </div>
          </div>
          <div class="todo_list">
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
          </div>
        </div>

        <div class="done_project">
          <div class="done_title">DONE</div>
          <div class="done_list">
            <div class="done_item">A/B test</div>
            <div class="done_item">Market Research</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  },
};
</script>
