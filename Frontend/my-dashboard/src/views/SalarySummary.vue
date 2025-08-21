<template>
  <div class="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center">
      <h3 class="text-lg font-semibold mb-2">Number of Employees</h3>
      <p class="text-2xl font-bold">{{ employees.length }}</p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center">
      <h3 class="text-lg font-semibold mb-2">Total of Basic Salary</h3>
      <p class="text-2xl font-bold">{{ totalBaseSalary }}</p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center">
      <h3 class="text-lg font-semibold mb-2">Total of Bonus</h3>
      <p class="text-2xl font-bold">{{ totalBonus }}</p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center">
      <h3 class="text-lg font-semibold mb-2">Total of Deductions</h3>
      <p class="text-2xl font-bold">{{ totalDeductions }}</p>
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center text-center col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
      <h3 class="text-lg font-semibold mb-2">Total of Net Salary</h3>
      <p class="text-3xl font-bold">{{ totalNetSalary }}</p>
    </div>

  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/services/api'

const employees = ref([])
const totalBaseSalary = ref(0)
const totalBonus = ref(0)
const totalDeductions = ref(0)
const totalNetSalary = ref(0)

onMounted(async () => {
  employees.value = await api.get('/employees')

  totalBaseSalary.value = employees.value.reduce((sum, emp) => sum + Number(emp.baseSalary || 0), 0)
  totalBonus.value = employees.value.reduce((sum, emp) => sum + Number(emp.bonus || 0), 0)
  totalDeductions.value = employees.value.reduce((sum, emp) => sum + Number(emp.deductions || 0), 0)
  totalNetSalary.value = employees.value.reduce((sum, emp) => {
    const base = Number(emp.baseSalary || 0)
    const bonus = Number(emp.bonus || 0)
    const deductions = Number(emp.deductions || 0)
    return sum + (base + bonus - deductions)
  }, 0)
})
</script>


