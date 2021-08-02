<template>
    <div class="analytics_board">
      <div class="week_graph_wrap">
        <div class="week_graph">
          <div class="bar_item_wrap">
            <div class="bar_item" v-for="n in 7" :key="n">
              <div class="bar">
                <span></span>
              </div>
              <div class="bar_info">
                <div class="date">
                  <div>Mon</div>
                  <div>3/13</div>
                </div>
                <div class="projects">
                  <span></span><span></span>
                </div>
              </div>
            </div>
          </div>
          <div class="frame_wrap">
            <div class="measure">
              <div>
                <span>10h</span>
              </div>
              <div>
                <span>8h</span>
              </div>
              <div>
                <span>6h</span>
              </div>
              <div>
                <span>4h</span>
              </div>
              <div>
                <span>2h</span>
              </div>
            </div>
            <div class="frame">

            </div>
          </div>
        </div>
      </div>
      <div class="week_summary">
        <div class="time_summary">
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
        <div class="project_summary">
          <div class="item" v-for="n in 4" :key="n">
            <span class="icon"></span>
            <span class="name">CODING</span>
            <span class="time">26h 35min</span>
          </div>
        </div>
      </div>
  </div>
</template>
