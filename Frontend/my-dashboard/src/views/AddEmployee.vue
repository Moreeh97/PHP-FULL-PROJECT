<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Add New Employee</h2>
    
    <form @submit.prevent="addEmployee" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <!-- Full name -->
      <div>
        <label class="block mb-1">Full Name</label>
        <input v-model="employee.name" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
      </div>

      <!-- Education -->
      <div>
        <label class="block mb-1">Education</label>
        <select v-model="employee.education" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" required>
          <option>Bachelor</option>
          <option>Master</option>
          <option>Prof</option>
        </select>
      </div>

      <!-- Phone number -->
      <div>
        <label class="block mb-1">Phone Number</label>
        <input v-model="employee.phone_number" type="number" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
      </div>

      <!-- Email -->
      <div>
        <label class="block mb-1">Email</label>
        <input v-model="employee.email" type="email" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
      </div>

      <!-- Department -->
      <div>
        <label class="block mb-1">Department</label>
        <input v-model="employee.department" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
      </div>

      <!-- Base salary -->
      <div>
        <label class="block mb-1">Base Salary</label>
        <input v-model.number="employee.base_salary" type="number" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
      </div>

      <!-- Bonus -->
      <div>
        <label class="block mb-1">Bonus</label>
        <input v-model.number="employee.bonus" type="number" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
      </div>

      <!-- Deductions -->
      <div>
        <label class="block mb-1">Deductions</label>
        <input v-model.number="employee.deductions" type="number" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
      </div>

      <!-- Date -->
      <div>
        <label class="block mb-1">Date</label>
        <input v-model="employee.date" type="datetime-local" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" required />
      </div>
      
      <!-- Upload contract -->
      <div>
        <label class="block mb-1">Upload Contract</label>
        <input type="file" @change="handleFileUpload" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
      </div>

      <!-- Note -->
      <div class="sm:col-span-2 md:col-span-3">
        <label class="block mb-1">Note</label>
        <input v-model="employee.note" type="text" class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400" />
      </div>

      <!-- Submit -->
      <div class="sm:col-span-2 md:col-span-3">
        <button type="submit" class="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded w-full md:w-auto">
          Save
        </button>
      </div>
    </form>
  </div>
</template>


<script setup>
import api from '@/services/api'
import { ref } from 'vue'

const employee = ref({
  name: '',
  email: '',
  phone_number: '',
  education: '',
  department: '',
  base_salary: 0,
  bonus: 0,
  deductions: 0,
  note: '',
  date: '',
  contract: null
})

const handleFileUpload = (event) => {
  employee.value.contract = event.target.files[0]
}

const addEmployee = async () => {
  try {
    const formData = new FormData()
    for (const key in employee.value) {
      formData.append(key, employee.value[key])
    }

    await api.addEmployee(formData) 
    alert('Employee added successfully!')
  } catch (err) {
    console.error('Saving failed:', err)
    alert('Error while saving employee')
  }
}
</script>


<!-- <script setup>
import api from '@/services/api'
import { data } from 'autoprefixer'
import { ref, vModelSelect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const employee = ref({
  name: '',
  email: '',
  phone_Number: '',
  education: '',
  department: '',
  base_salary: 0,
  bonus: 0,
  deductions: 0 ,
  note: '',
  contract: '',
  data: '',
  created_at: '',
  deleted_at: ''
})

const addEmployee = () => {
  try {
    api.addEmployee(employee.value)
    alert('employee added seccesfully ! ')
  } catch (err) {
    console.error('Saving failed:', err)
  }
}
</script> -->
