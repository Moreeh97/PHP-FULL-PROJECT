
import { createRouter, createWebHashHistory } from 'vue-router'

import AddEmployee from '@/views/AddEmployee.vue'
import Employees from '@/views/Employees.vue'
import EmployeeProfile from '@/views/EmployeeProfile.vue'
import DashboardCard from '@/components/DashboardCard.vue'
import salarySummary from '@/views/SalarySummary.vue'
import DeleteEmployee from '@/views/DeleteEmployee.vue'
import Recovery from '@/views/Recovery.vue'
import LeavesManagement from '@/views/LeavesManagement.vue'



const routes = [
  
  { path: '/home', name: 'DashboardCard', component: DashboardCard },
  { path: '/add-employee', name: 'AddEmployee', component: AddEmployee },
  { path: '/delete-employee', name: 'DeleteEmployee', component: DeleteEmployee },
  { path: '/employees', name: 'Employees', component: Employees },
  { path: '/employee-profile', name: 'EmployeeProfile', component: EmployeeProfile },
  { path: '/salary-summary', name: 'salarySummary', component: salarySummary },
  { path: '/leave-management', name: 'LeavesManagement', component: LeavesManagement },
  { path: '/recover-employees', name: 'Recovery', component: Recovery },
]




const router = createRouter({
  history: createWebHashHistory('/vue-dashboard-live/'),
  routes
})

export default router
