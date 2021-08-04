<template>
      <div class="side_bar">
      <div class="title"
      :style="{'color':(isBreak)? break_color[1] : work_color[1] }">POMODORO</div>
      <div class="profile">
        <img src="/assets/img/TXT_MG_38.jpg" alt="" />
        <div class="profile_name">Ben Choi</div>
      </div>
      <div class="menu">

        <router-link custom v-slot="{ navigate,isExactActive }"
        :to="{name:'Home'}">
          <div class="menu_item"
          :class="[isExactActive && 'active']"
          @click="navigate">
            <span class="material-icons">person</span>Dashboard
          </div>
        </router-link>

        <router-link custom v-slot="{ navigate,isActive }"
        :to="{name:'Analytics'}">
          <div class="menu_item"
          :class="[isActive && 'active']"
          @click="navigate">
            <span class="material-icons">bar_chart</span>Analytics
          </div>
        </router-link>

      </div>
      <div class="login"><span class="material-icons">keyboard_return</span> Sign out</div>
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
    };
  },
  computed: {
    ...mapState(['isBreak']),
    nowColor() {
      return (this.isBreak) ? this.break_color : this.work_color;
    },
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
</style>
