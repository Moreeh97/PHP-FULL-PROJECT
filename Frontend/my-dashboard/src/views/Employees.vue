<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6">Employees Menu</h2>

    <!-- Employee List -->
    <div v-if="!viewingDetails" class="overflow-x-auto">
      <table class="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead class="bg-gray-100">
          <tr>
            <th class="border px-4 py-2">ID</th>
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Department</th>
            <th class="border px-4 py-2">Base Salary</th>
            <th class="border px-4 py-2">Bonus</th>
            <th class="border px-4 py-2">Deductions</th>
            <th class="border px-4 py-2">Final Salary</th>
            <th class="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(emp, index) in employees" :key="index" class="hover:bg-gray-50">
            <td class="border px-4 py-2">{{ index + 1 }}</td>
            <td class="border px-4 py-2">{{ emp.name }}</td>
            <td class="border px-4 py-2">{{ emp.department }}</td>
            <td class="border px-4 py-2">{{ emp.baseSalary }}</td>
            <td class="border px-4 py-2">{{ emp.bonus }}</td>
            <td class="border px-4 py-2">{{ emp.deductions }}</td>
            <td class="border px-4 py-2 font-medium text-green-600">
              {{ emp.baseSalary + emp.bonus - emp.deductions }}
            </td>
            <td class="border px-4 py-2 text-center">
              <button 
                @click="showDetails(emp, index)" 
                class="bg-orange-400 hover:bg-orange-500 text-white px-3 py-1 rounded"
              >
                View Details
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="employees.length === 0" class="mt-6 text-center text-gray-500">
        No employees.
      </div>
    </div>

    <!-- Employee Details -->
    <div v-else class="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h3 class="text-xl font-semibold mb-6">Employee Details</h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block mb-1">Name:</label>
          <input v-model="selectedEmployee.name" type="text" class="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label class="block mb-1">Email:</label>
          <input v-model="selectedEmployee.email" type="email" class="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label class="block mb-1">Phone Number:</label>
          <input v-model="selectedEmployee.phoneNumber" type="text" class="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label class="block mb-1">Education:</label>
          <input v-model="selectedEmployee.education" type="text" class="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label class="block mb-1">Department:</label>
          <input v-model="selectedEmployee.department" type="text" class="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label class="block mb-1">Basic Salary:</label>
          <input v-model.number="selectedEmployee.baseSalary" type="number" class="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label class="block mb-1">Bonus:</label>
          <input v-model.number="selectedEmployee.bonus" type="number" class="w-full border px-3 py-2 rounded" />
        </div>

        <div>
          <label class="block mb-1">Deductions:</label>
          <input v-model.number="selectedEmployee.deductions" type="number" class="w-full border px-3 py-2 rounded" />
        </div>

        <div class="sm:col-span-2">
          <label class="block mb-1">Note:</label>
          <textarea v-model="selectedEmployee.note" class="w-full border px-3 py-2 rounded"></textarea>
        </div>

        <div class="sm:col-span-2">
          <label class="block mb-1">Contract:</label>
          <input type="file" @change="handleContractUpload" class="w-full border px-3 py-2 rounded" />
        </div>
      </div>

      <!-- Actions -->
      <div class="mt-6 flex justify-between">
        <button @click="updateEmployee" class="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded">
          Update
        </button>
        <button @click="backToList" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
          Back
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { fetchEmployees } from '@/services/employees';

const employees = ref([]);
const loading = ref(false);
const error = ref('');

async function load() {
  loading.value = true;
  error.value = '';
  try {
    employees.value = await fetchEmployees();
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
}

onMounted(load);
</script>


<!-- <script setup>
import { ref, onMounted } from 'vue'

const employees = ref([])
const selectedEmployee = ref({})
const viewingDetails = ref(false)
let currentIndex = ref(-1)

onMounted(() => {
  const stored = JSON.parse(localStorage.getItem('employees') || '[]')
  employees.value = stored
})

const showDetails = (emp, index) => {
  selectedEmployee.value = { ...emp }
  currentIndex.value = index
  viewingDetails.value = true
}

const updateEmployee = () => {
  if (currentIndex.value !== -1) {
    employees.value[currentIndex.value] = { ...selectedEmployee.value }
    localStorage.setItem('employees', JSON.stringify(employees.value))
    alert('data updated !')
    viewingDetails.value = false
  }
}

const backToList = () => {
  viewingDetails.value = false
}
</script> -->
