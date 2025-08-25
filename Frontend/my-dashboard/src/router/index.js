import { createRouter, createWebHashHistory } from 'vue-router'
import DashboardCard from '@/components/DashboardCard.vue'
import Employees from '@/views/Employees.vue'
import AddEmployee from '@/views/AddEmployee.vue'
import DeleteEmployee from '@/views/DeleteEmployee.vue'


const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: DashboardCard },
  { path: '/employees', component: Employees },
  { path: '/add-employee', component: AddEmployee },
  { path: '/delete-employee', component: DeleteEmployee },

]

const router = createRouter({
  history: createWebHashHistory(), 
  routes
})

export default router


// import { createRouter, createWebHistory } from 'vue-router';

// import DashboardCard from '@/components/DashboardCard.vue';
// import Employees from '@/views/Employees.vue';
// import AddEmployee from '@/views/AddEmployee.vue';

// const routes = [
//   { path: '/', redirect: '/home' },
//   { path: '/home', component: DashboardCard },
//   { path: '/employees', component: Employees },
//   { path: '/add-employee', component: AddEmployee },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// });

// export default router;
