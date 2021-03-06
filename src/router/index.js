import { createRouter, createWebHistory } from 'vue-router';
import Analytics from '@/views/Analytics.vue';
import DayAnalytics from '@/views/DayAnalytics.vue';
import WeekAnalytics from '@/views/WeekAnalytics.vue';

import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: Analytics,
    redirect: { name: 'DayAnalytics' },
    children: [
      {
        name: 'DayAnalytics',
        path: 'day',
        component: DayAnalytics,
      },
      {
        name: 'WeekAnalytics',
        path: 'week',
        component: WeekAnalytics,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'active',
});

export default router;
