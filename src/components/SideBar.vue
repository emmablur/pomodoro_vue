<template>
    <div class="side_bar_toggle">
      <span class="material-icons" @click="open = true">menu</span>
    </div>
    <div class="side_bar_bg" :class="{active:open}" @click="open = false"></div>
    <div class="side_bar" :class="{active:open}">
      <div class="title"
      :style="{'color':(isBreak)? break_color[1] : work_color[1] }">POMODORO</div>
      <div class="profile">
        <img src="assets/img/smileface.png" alt="" />
        <div class="profile_name">User</div>
      </div>
      <div class="menu">
        <router-link custom v-slot="{ isExactActive }"
        :to="{name:'Home'}">
          <div class="menu_item"
          :class="[isExactActive && 'active']"
          @click="useRouter('Home')">
            <span class="material-icons">person</span>Dashboard
          </div>
        </router-link>
        <router-link custom v-slot="{ isActive }"
        :to="{name:'Analytics'}">
          <div class="menu_item"
          :class="[isActive && 'active']"
          @click="useRouter('Analytics')">
            <span class="material-icons">bar_chart</span>Analytics
          </div>
        </router-link>
      </div>
      <div class="login">
        <span class="material-icons">keyboard_return</span> Sign out
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'sidebar',
  data() {
    return {
      work_color: ['#FBC2EB', '#A6C1EE'],
      break_color: ['#FBED96', '#ABECD6'],
      open: false,
      screen_width: 0,
      styleSideBar: {
        transform: 'translate(0)',
      },
    };
  },
  computed: {
    ...mapState(['isBreak']),
    nowColor() {
      return (this.isBreak) ? this.break_color : this.work_color;
    },
  },
  watch: {
    screen_width(newWidth) {
      if (newWidth > 768) {
        this.open = true;
      } else {
        this.open = false;
      }
    },
  },
  methods: {
    handleResize() {
      this.screen_width = window.innerWidth;
    },
    useRouter(routeName) {
      this.open = false;
      this.$router.push({ name: `${routeName}` });
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style lang="scss">
%sidebarItemBg{
  background: linear-gradient(90deg, transparent, white),
            linear-gradient(285deg, v-bind('nowColor[0]') 0%, v-bind('nowColor[1]') 100%);
  }

.menu{
  >.active{
    @extend %sidebarItemBg;
  }
  >.menu_item{
    &:hover{
      @extend %sidebarItemBg;
    }
  }
}
.side_bar.active{
  transform: translate(0);
}

.side_bar_bg.active{
  @media (max-width:768px) {
    opacity: 1;
    left: 0;
  }
}
</style>
