<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Employees List</h2>

    <table v-if="employees.length" class="min-w-full border border-gray-300 rounded-lg overflow-hidden">
      <thead class="bg-gray-100">
        <tr>
          <th class="px-4 py-2 border-b">ID</th>
          <th class="px-4 py-2 border-b">Name</th>
          <th class="px-4 py-2 border-b">Department</th>
          <th class="px-4 py-2 border-b">Phone</th>
          <th class="px-4 py-2 border-b">Base Salary</th>
          <th class="px-4 py-2 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.id" class="hover:bg-gray-50">
          <td class="px-4 py-2 border-b">{{ emp.id }}</td>
          <td class="px-4 py-2 border-b">{{ emp.name }}</td>
          <td class="px-4 py-2 border-b">{{ emp.department }}</td>
          <td class="px-4 py-2 border-b">{{ emp.phone_number }}</td>
          <td class="px-4 py-2 border-b">{{ emp.base_salary }}</td>
          <td class="px-4 py-2 border-b">
            <button 
              @click="viewEmployee(emp)" 
              class="bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 rounded">
              View Details
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="text-gray-500">Loading employees...</div>

    <!-- Employee Details Modal -->
    <div v-if="selectedEmployee" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
        <h3 class="text-xl font-bold mb-4">Employee Details</h3>
        <ul class="space-y-2">
          <li><strong>ID:</strong> {{ selectedEmployee.id }}</li>
          <li><strong>Name:</strong> {{ selectedEmployee.name }}</li>
          <li><strong>Email:</strong> {{ selectedEmployee.email }}</li>
          <li><strong>Phone:</strong> {{ selectedEmployee.phone_number }}</li>
          <li><strong>Department:</strong> {{ selectedEmployee.department }}</li>
          <li><strong>Education:</strong> {{ selectedEmployee.education }}</li>
          <li><strong>Base Salary:</strong> {{ selectedEmployee.base_salary }}</li>
          <li><strong>Bonus:</strong> {{ selectedEmployee.bonus }}</li>
          <li><strong>Deductions:</strong> {{ selectedEmployee.deductions }}</li>
          <li><strong>Note:</strong> {{ selectedEmployee.note }}</li>
          <li><strong>Contract:</strong> {{ selectedEmployee.contract }}</li>
          <li><strong>Created At:</strong> {{ selectedEmployee.created_at }}</li>
        </ul>
        <button 
          @click="selectedEmployee = null" 
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          ✖
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const employees = ref([])
const selectedEmployee = ref(null)

async function loadEmployees() {
  try {
    const res = await axios.get('http://php-full-project.local/api/employees')
    employees.value = res.data
  } catch (err) {
    console.error('Failed to load employees', err)
    alert('Failed to load employees.')
  }
}

function viewEmployee(emp) {
  selectedEmployee.value = emp
}

onMounted(loadEmployees)
</script>

<style scoped>
</style>

