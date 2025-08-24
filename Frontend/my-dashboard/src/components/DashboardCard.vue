<template>
  <div class="p-4 sm:p-6 dark:bg-gray-700 dark:text-white min-h-screen">
    <h1 class="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">
      Public Summary
    </h1>

    <!-- action buttons -->
    <div class="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 mb-6 justify-center sm:justify-start">
      <button @click="showAddModal = true" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">
        Add employee
      </button>
      <button @click="showDeletedModal = true" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">
        Trash
      </button>
    </div>

    <!-- summary cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center font-medium">
        Total employees: {{ employees.length }}
      </div>
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center font-medium">
        Max salary: {{ maxSalary }}
      </div>
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center font-medium">
        Min salary: {{ minSalary }}
      </div>
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-center font-medium">
        Total salaries: {{ totalSalary }}
      </div>
    </div>

    <!-- employees table -->
    <div class="mt-8 overflow-x-auto">
      <table class="w-full min-w-[600px] table-auto border border-gray-200 dark:border-gray-600">
        <thead>
          <tr class="bg-gray-200 dark:bg-gray-600 text-left">
            <th class="p-3">Name</th>
            <th class="p-3">Department</th>
            <th class="p-3">Salary</th>
            <th class="p-3">Options</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(emp, index) in employees"
            :key="index"
            class="border-b hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td class="p-3">{{ emp.name }}</td>
            <td class="p-3">{{ emp.department }}</td>
            <td class="p-3">{{ emp.base_salary }}</td>
            <td class="p-3 flex flex-wrap gap-2">
              <button @click="openDetails(emp)" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition">Show</button>
              <button @click="openEdit(emp)" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded transition">Edit</button>
              <button @click="confirmDelete(emp)" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add employee modal -->
    <div v-if="showAddModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 class="text-lg font-bold mb-4">Add employee</h2>
        <input v-model="newEmployee.name" placeholder="Name" class="w-full p-2 border rounded mb-2" />
        <input v-model="newEmployee.email" placeholder="Email" type="email" class="w-full p-2 border rounded mb-2" />
        <input v-model="newEmployee.phone_number" placeholder="Phone Number" class="w-full p-2 border rounded mb-2" />
        <input v-model="newEmployee.education" placeholder="Education" class="w-full p-2 border rounded mb-2" />
        <input v-model="newEmployee.department" placeholder="Department" class="w-full p-2 border rounded mb-2" />
        <input v-model="newEmployee.base_salary" placeholder="Salary" type="number" class="w-full p-2 border rounded mb-4" />
        <input v-model="newEmployee.bonus" placeholder="Bonus" type="number" class="w-full p-2 border rounded mb-4" />
        <input v-model="newEmployee.deductions" placeholder="Deductions" type="number" class="w-full p-2 border rounded mb-4" />
        <input v-model="newEmployee.note" placeholder="Note" class="w-full p-2 border rounded mb-4" />
        <input v-model="newEmployee.date" placeholder="Date" type="date" class="w-full p-2 border rounded mb-4" />
        <div class="flex justify-end gap-2">
          <button @click="addEmployee" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Save</button>
          <button @click="showAddModal = false" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Edit employee modal -->
    <div v-if="showEditModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 class="text-lg font-bold mb-4">Edit employee</h2>
        <input v-model="editEmployee.name" placeholder="Name" class="w-full p-2 border rounded mb-2" />
        <input v-model="editEmployee.department" placeholder="Department" class="w-full p-2 border rounded mb-2" />
        <input v-model="editEmployee.baseSalary" type="number" placeholder="Salary" class="w-full p-2 border rounded mb-4" />
        <div class="flex justify-end gap-2">
          <button @click="saveEdit" class="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded">Update</button>
          <button @click="showEditModal = false" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>

    <!-- employee Details modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 class="text-lg font-bold mb-4">Employee Details</h2>
        <p class="mb-1"><strong>Name:</strong> {{ detailsEmployee.name }}</p>
        <p class="mb-1"><strong>Department:</strong> {{ detailsEmployee.department }}</p>
        <p class="mb-4"><strong>Basic salary:</strong> {{ detailsEmployee.baseSalary }}</p>
        <div class="flex justify-end">
          <button @click="showDetailsModal = false" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">Back</button>
        </div>
      </div>
    </div>

    <!-- confirm delete modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 class="text-lg font-bold mb-4 text-red-600">Confirm Delete</h2>
        <p>Are you sure you want to delete employee: <strong>{{ deleteTarget.name }}</strong>?</p>
        <div class="flex justify-end gap-2 mt-4">
          <button @click="deleteEmployee" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">Yes</button>
          <button @click="showDeleteModal = false" class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">No</button>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Data
const employees = ref([])
const maxSalary = ref(0)
const minSalary = ref(0)
const totalSalary = ref(0)

// Modals
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDetailsModal = ref(false)
const showDeleteModal = ref(false)
const showDeletedModal = ref(false)

// Employee Models
const newEmployee = ref({
  name: '',
  email: '',
  phone_number: '',
  education: '',
  department: '',
  base_salary: '',
  bonus: '',
  deductions: '',
  note: '',
  date: '',
  contract: null
})
const editEmployee = ref({
  id: null,
  name: '',
  phone_number: '',
  education: '',
  base_salary: 0
})
const detailsEmployee = ref({})
const deleteTarget = ref({})

// Load employees
async function loadEmployees() {
  try {
    const res = await axios.get('http://php-full-project.local/api/employees')
    employees.value = res.data
    calculateSalaries()
  } catch (err) {
    console.error('Failed to load employees', err)
  }
}

// Calculate summaries
function calculateSalaries() {
  if (employees.value.length === 0) {
    maxSalary.value = minSalary.value = totalSalary.value = 0
    return
  }
  const salaries = employees.value.map(emp => parseFloat(emp.base_salary))
  maxSalary.value = Math.max(...salaries)
  minSalary.value = Math.min(...salaries)
  totalSalary.value = salaries.reduce((a, b) => a + b, 0)
}

// Add employee
async function addEmployee() {
  try {
    const formData = new FormData()
    for (let key in newEmployee.value) {
      formData.append(key, newEmployee.value[key])
    }

    const res = await axios.post('http://php-full-project.local/api/employees', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    if (res.data.success) {
      employees.value.push(res.data.employee)
      success.value = true
      calculateSalaries()
      showAddModal.value = false
      newEmployee.value = { name: '', email: '', phone_number: '', education: '', department: '', base_salary: '', bonus: '', deductions: '', note: '', date: '', contract: null }
    } else {
      alert('Error saving employee')
    }
  } catch (err) {
    console.error('Error adding employee', err)
  }
}

// Open edit modal
function openEdit(emp) {
  editEmployee.value = { ...emp, base_salary: parseFloat(emp.base_salary) }
  showEditModal.value = true
}

// Save edit
async function saveEdit() {
  try {
    const res = await axios.put(`http://php-full-project.local/api/employees/${editEmployee.value.id}`, editEmployee.value)
    if (res.data.success) {
      const index = employees.value.findIndex(e => e.id === editEmployee.value.id)
      if (index !== -1) employees.value[index] = { ...editEmployee.value }
      calculateSalaries()
      showEditModal.value = false
    } else {
      alert('Error updating employee')
    }
  } catch (err) {
    console.error('Error updating employee', err)
  }
}

// Open details modal
function openDetails(emp) {
  detailsEmployee.value = { ...emp }
  showDetailsModal.value = true
}

// Confirm delete
function confirmDelete(emp) {
  deleteTarget.value = emp
  showDeleteModal.value = true
}

// Delete employee
async function deleteEmployee() {
  try {
    const res = await axios.delete(`http://php-full-project.local/api/employees/${deleteTarget.value.id}`)
    if (res.data.success) {
      employees.value = employees.value.filter(emp => emp.id !== deleteTarget.value.id)
      calculateSalaries()
      showDeleteModal.value = false
    } else {
      alert('Error deleting employee')
    }
  } catch (err) {
    console.error('Error deleting employee', err)
  }
}

// Initial load
onMounted(loadEmployees)


</script>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
}

.input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

</style>
