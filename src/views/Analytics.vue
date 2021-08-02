<template>
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
  <router-view></router-view>
</template>

<script>
export default {
  name: 'Analytics',
};
</script>
