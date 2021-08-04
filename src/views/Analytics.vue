<template>
<section>
  <div class="duration_toggle_wrap">
     <div class="duration_toggle">
        <router-link custom :to="{name:'WeekAnalytics'}"
        v-slot="{ navigate,isExactActive }">
          <span class="material-icons"
                :class="{'active':isExactActive}"
                @click="navigate">
                navigate_before
          </span>
        </router-link>

        <span class="title" v-text="(this.$route.name==='DayAnalytics')?'Today':'This week'">
        </span>

        <router-link custom :to="{name:'DayAnalytics'}"
        v-slot="{ navigate,isExactActive }">
          <span class="material-icons"
                :class="{'active':isExactActive}"
                @click="navigate">
                navigate_next
          </span>
        </router-link>
     </div>
  </div>

  <router-view v-slot="{Component}">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

</section>
</template>

<script>
export default {
  name: 'Analytics',
};
</script>

<style>
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
