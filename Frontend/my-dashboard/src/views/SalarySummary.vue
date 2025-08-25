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
import axios from 'axios';

const employees = ref([]);

const fetchEmployees = async () => {
  try {
    const response = await axios.get('http://php-full-project.local/api/employees');
    employees.value = response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
  }
};

const totalBaseSalary = computed(() => {
  return employees.value.reduce((sum, emp) => sum + (parseFloat(emp.base_salary) || 0), 0).toFixed(2);
});

const totalBonus = computed(() => {
  return employees.value.reduce((sum, emp) => sum + (parseFloat(emp.bonus) || 0), 0).toFixed(2);
});

const totalDeductions = computed(() => {
  return employees.value.reduce((sum, emp) => sum + (parseFloat(emp.deductions) || 0), 0).toFixed(2);
});

const totalNetSalary = computed(() => {
  return employees.value.reduce((sum, emp) => {
    const base = parseFloat(emp.base_salary) || 0;
    const bonus = parseFloat(emp.bonus) || 0;
    const deductions = parseFloat(emp.deductions) || 0;
    return sum + (base + bonus - deductions);
  }, 0).toFixed(2);
});

onMounted(fetchEmployees);


</script>


<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
