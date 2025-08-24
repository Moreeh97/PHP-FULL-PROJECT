<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Add New Employee</h2>
    <form @submit.prevent="addEmployee" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

      <input v-model="employee.name" type="text" placeholder="Full Name" required class="input" />
      <input v-model="employee.email" type="email" placeholder="Email" required class="input" />
      <input v-model="employee.phone_number" type="text" placeholder="Phone" required class="input" />
      <select v-model="employee.education" class="input">
        <option>Bachelor</option>
        <option>Master</option>
        <option>Prof</option>
      </select>
      <input v-model="employee.department" type="text" placeholder="Department" required class="input" />
      <input v-model.number="employee.base_salary" type="number" placeholder="Base Salary" required class="input" />
      <input v-model.number="employee.bonus" type="number" placeholder="Bonus" class="input" />
      <input v-model.number="employee.deductions" type="number" placeholder="Deductions" class="input" />
      <input v-model="employee.date" type="datetime-local" required class="input" />
      <input type="file" @change="handleFileUpload" class="input" />
      <input v-model="employee.note" type="text" placeholder="Note" class="input" />

      <button type="submit" class="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded col-span-full">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const BASE_URL = "http://php-full-project.local/api/employees/create"

const employee = ref({
  name: "",
  email: "",
  phone_number: "",
  education: "Bachelor",
  department: "",
  base_salary: 0,
  bonus: 0,
  deductions: 0,
  note: "",
  date: "",
  contract: null
})

const handleFileUpload = (event) => {
  employee.value.contract = event.target.files[0]
}

const resetEmployee = () => {
  for (const key in employee.value) {
    employee.value[key] = key === "contract" ? null : ""
  }
  employee.value.education = "Bachelor"
  employee.value.base_salary = 0
  employee.value.bonus = 0
  employee.value.deductions = 0
}

const addEmployee = async () => {
  const formData = new FormData()
  for (const key in employee.value) {
    formData.append(key, employee.value[key])
  }

  try {
    const res = await axios.post(BASE_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    if(res.data.success){
      alert("Employee added successfully!")
      resetEmployee()
    } else {
      alert("Failed to add employee")
    }
  } catch (err) {
    console.error(err)
    alert("Error saving employee")
  }
}
</script>

<style>
.input { border: 1px solid #ccc; padding: 8px; border-radius: 4px; width: 100%; }
</style>
