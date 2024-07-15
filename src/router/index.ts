import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashBoard from '@/components/Layout/DashBoard.vue'
import OnlineStore from '@/components/Layout/OnlineStore.vue'
import SalesBoard from '@/components/Layout/SalesBoard.vue'
import TransactionBoard from '@/components/Layout/TransactionBoard.vue'
declare global {
  interface ImportMeta {
      env: Record<string, string>;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: route => ({
        params: {
          amount: route.query.amount  || 10000,
          target: route.query.target || 30000,
          store: route.query.store || 15
        }
      }),
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashBoard,
          props: true
        },
        {
          path: '/onlineStore',
          name: 'onlineStore',
          component: OnlineStore,
        },
        {
          path: '/sales',
          name: 'sales',
          component: SalesBoard,
        },
        {
          path: '/transaction',
          name: 'transaction',
          component: TransactionBoard,
        }
      ]
    }
  ]
})
export default router
