import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AnalysisView from '../views/AnalysisView.vue'
import CoverView from '../views/CoverView.vue'
import PlanView from '../views/PlanView.vue'
import PracticeView from '../views/PracticeView.vue'
import ReviewView from '../views/ReviewView.vue'

export const ROUTE_NAMES = {
  home: 'home',
  analysis: 'analysis',
  cover: 'cover',
  plan: 'plan',
  practice: 'practice',
  review: 'review',
} as const

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      name: ROUTE_NAMES.home,
      component: HomeView,
    },
    {
      path: '/analysis',
      name: ROUTE_NAMES.analysis,
      component: AnalysisView,
    },
    {
      path: '/cover',
      name: ROUTE_NAMES.cover,
      component: CoverView,
    },
    {
      path: '/plan',
      name: ROUTE_NAMES.plan,
      component: PlanView,
    },
    {
      path: '/practice',
      name: ROUTE_NAMES.practice,
      component: PracticeView,
    },
    {
      path: '/review',
      name: ROUTE_NAMES.review,
      component: ReviewView,
    },
  ],
})

export default router
