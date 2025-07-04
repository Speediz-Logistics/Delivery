import requiredAuth from "@/router/middlewares/requiredAuth.js";
import authenticated from "@/router/middlewares/redirectIfAuthenticated.js";

export default [
  {
    path: '/delivery',
    name: 'delivery',
    component: () => import('@/views/pages/delivery/index.vue'),
    children: [
      {
        path: '',
        name: 'delivery.index',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/pages/delivery/screens/LoginScreen.vue'),
        meta: { middlewares: [authenticated] },
      },
      {
        path: 'logout',
        name: 'logout',
        component: () => import('@/views/pages/delivery/screens/Logout.vue'),
      },
      {
        path: 'sign-up',
        name: 'sign-up',
        component: () => import('@/views/pages/delivery/screens/SignUp.vue'),
      },
      {
        path:'onboard-screen',
        name: 'onboard-Screen',
        component: () => import('@/views/pages/delivery/screens/OnBoardScreen.vue'),
        meta: { middlewares: [requiredAuth] },
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('@/views/pages/delivery/screens/ForgetPassword.vue')
      },
      {
        path:'express',
        name: 'express',
        component:() => import('@/views/pages/delivery/screens/express/index.vue')
      },
      {
        path: 'history',
        name: 'history',
        component: () => import('@/views/pages/delivery/screens/history/index.vue')
      },
      {
        path: 'history-detail/:id',
        name: 'history-detail',
        component: () => import('@/views/pages/delivery/screens/history/detail/[id].vue')
      },
      //map
      {
        path: 'map',
        name: 'map-index',
        component: () => import('@/views/pages/delivery/screens/map/index.vue')
      },
      {
        path: 'map/:id',
        name: 'map',
        component: () => import('@/views/pages/delivery/screens/Map.vue')
      }
    ],
  },
];
