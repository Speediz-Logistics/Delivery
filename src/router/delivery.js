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
        path: 'register',
        name: 'register',
        component: () => import('@/views/pages/delivery/screens/RegisterScreen.vue'),
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
      }
    ],
  },
];
