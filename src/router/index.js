import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import createStore from '../store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{rutaProtegida: true}
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/editar/:id',
    name: 'editar',
    component: () => import(/* web */ '../views/Editar.vue'),
    meta:{rutaProtegida:true}
  },
  {
    path: '/editarProveedor/:id',
    name: 'editarP',
    component: () => import(/* web */ '../views/EditarProveedor.vue'),
    meta:{rutaProtegida:true}
  },
  {
    path: '/agregarProvedores',
    name: 'provedores',
    component: () => import(/* web */ '../views/AgregarProveedor.vue'),
    meta:{rutaProtegida:true}
  }
  ,
  {
    path : '/registro',
    name: 'Registro',
    component: () => import(/* web */ '../views/Registro.vue')
  },
  {
    path : '/login',
    name: 'Login',
    component: () => import(/* web */ '../views/Login.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from, next)=>{
  console.log(to.meta.rutaProtegida)
  if(to.meta.rutaProtegida){
   if(createStore.getters.usuarioAutenticado){
     next();
   }else{
     next('/login');
   }
  }else{
    next();
  }
})

export default router
