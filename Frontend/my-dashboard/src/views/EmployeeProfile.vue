<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold mb-6">Employee Profile</h2>

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
          Show Profile
        </button>
      </div>
    </div>

    <!-- Employee Data -->
    <div v-if="employee" class="bg-white shadow rounded-lg p-6 space-y-2">
      <h3 class="text-lg font-semibold mb-4">Employee Data</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-700">
        <p><strong>Name:</strong> {{ employee.name }}</p>
        <p><strong>Department:</strong> {{ employee.department }}</p>
        <p><strong>Base Salary:</strong> {{ employee.baseSalary }}</p>
        <p><strong>Bonus:</strong> {{ employee.bonus }}</p>
        <p><strong>Deductions:</strong> {{ employee.deductions }}</p>
      </div>
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
  const found = employees.find(emp => emp.name.trim().toLowerCase() === searchName.value.trim().toLowerCase())

  if (found) {
    employee.value = found
  } else {
    employee.value = null
  }

  searched.value = true
}
</script>

<style scoped>
input {
  direction: ltr;
}
</style>
