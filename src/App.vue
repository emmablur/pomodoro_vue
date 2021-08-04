<template>
  <div class="wrap">
    <side-bar/>
      <div class="main">
        <router-view v-slot="{Component}">
          <transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </transition>
        </router-view>
      </div>
  </div>
</template>
<script>
import sideBar from '@/components/SideBar.vue';

export default {
  components: {
    sideBar,
  },
  mounted() {
    this.$store.dispatch('initProjects');
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active{
  transition: all 0.25s linear;
}
.fade-leave-to {
  transition: all 0.25s linear;
  opacity: 0;
}

</style>
