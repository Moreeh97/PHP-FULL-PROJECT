<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">Delete Employee</h2>

    <!-- Search Section -->
    <div class="mb-6">
      <label class="block mb-2 font-medium text-gray-700">Enter employee:</label>
      <div class="flex flex-col sm:flex-row gap-2">
        <input 
          v-model="searchName" 
          type="text" 
          placeholder="Full name"
          class="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button 
          @click="searchEmployee"
          class="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded"
        >
          Delete Employee
        </button>
      </div>
    </div>

    <!-- Employee Data -->
    <div v-if="employee" class="bg-white shadow rounded-lg p-6 space-y-2">
      <h3 class="text-lg font-semibold mb-4">Employee Data</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-700">
        <p><strong>Name:</strong> {{ employee.name }}</p>
        <p><strong>Education:</strong> {{ employee.education }}</p>
        <p><strong>Phone:</strong> {{ employee.phoneNumber }}</p>
        <p><strong>Email:</strong> {{ employee.email }}</p>
        <p><strong>Department:</strong> {{ employee.department }}</p>
        <p><strong>Base Salary:</strong> {{ employee.baseSalary }}</p>
        <p><strong>Bonus:</strong> {{ employee.bonus }}</p>
        <p><strong>Deductions:</strong> {{ employee.deductions }}</p>
      </div>

      <button 
        @click="deleteEmployee"
        class="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded w-full sm:w-auto"
      >
        Move to Trash
      </button>
    </div>

    <!-- Not Found -->
    <div v-else-if="searched" class="mt-4">
      <p class="text-orange-500 font-medium">Employee Not Found.</p>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'


const searchName = ref('')
const employee = ref(null)
const searched = ref(false)

const searchEmployee = () => {
  const employees = JSON.parse(localStorage.getItem('employees') || '[]')
  const found = employees.find(emp =>
    emp.name.trim().toLowerCase() === searchName.value.trim().toLowerCase()
  )

  if (found) {
    employee.value = found
  } else {
    employee.value = null
  }

  searched.value = true
}

const deleteEmployee = () => {
  const employees = JSON.parse(localStorage.getItem('employees') || '[]')
  const updatedEmployees = employees.filter(emp =>
    emp.name.trim().toLowerCase() !== employee.value.name.trim().toLowerCase()
  )
  localStorage.setItem('employees', JSON.stringify(updatedEmployees))

  const trash = JSON.parse(localStorage.getItem('trashEmployees') || '[]')
  trash.push(employee.value)
  localStorage.setItem('trashEmployees', JSON.stringify(trash))

  employee.value = null
  searchName.value = ''
  searched.value = false

  alert('the employee moved to trash')
}
</script>

<style scoped>
input {
  direction: ltr;
}
</style>
