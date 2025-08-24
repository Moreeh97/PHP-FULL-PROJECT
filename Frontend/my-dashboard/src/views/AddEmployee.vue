<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Add Employee</h2>

<form @submit.prevent="addEmployee" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

  <input v-model="form.name" type="text" placeholder="Name" class="border p-2 w-full rounded" required />
  <input v-model="form.email" type="email" placeholder="Email" class="border p-2 w-full rounded" required />
  <input v-model="form.phone_number" type="text" placeholder="Phone Number" class="border p-2 w-full rounded" required />

  <select v-model="form.education" class="border p-2 w-full rounded">
    <option value="">-- Select Education --</option>
    <option value="Bachelor">Bachelor</option>
    <option value="Master">Master</option>
    <option value="Prof">Prof</option>
  </select>

  <select v-model="form.department" class="border p-2 w-full rounded">
    <option value="">-- Select Department --</option>
    <option value="IT">IT</option>
    <option value="SW">SW</option>
    <option value="AI">AI</option>
    <option value="HR">HR</option>
    <option value="SDN">SDN</option>
  </select>

  <input v-model="form.base_salary" type="number" placeholder="Base Salary" class="border p-2 w-full rounded" required />
  <input v-model="form.bonus" type="number" placeholder="Bonus" class="border p-2 w-full rounded" />
  <input v-model="form.deductions" type="number" placeholder="Deductions" class="border p-2 w-full rounded" />

  <textarea v-model="form.note" placeholder="Note" class="border p-2 w-full rounded col-span-1 sm:col-span-2 md:col-span-3"></textarea>

  <input v-model="form.date" type="date" class="border p-2 w-full rounded" />
  <input type="file" @change="handleFileUpload" class="border p-2 w-full rounded" />

  <button type="submit" class="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500 col-span-1 sm:col-span-2 md:col-span-3">
    Save Employee
  </button>

</form>


    <p v-if="message" :class="{'text-green-600': success, 'text-red-600': !success}" class="mt-4">
      {{ message }}
    </p>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import axios from 'axios'

const form = ref({
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

const message = ref('')
const success = ref(false)

function handleFileUpload(e) {
  form.value.contract = e.target.files[0]
}

async function addEmployee() {
  try {
    const formData = new FormData()
    for (let key in form.value) {
      formData.append(key, form.value[key])
    }

    const res = await axios.post('http://php-full-project.local/api/employees', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    if (res.data.success) {
      message.value = "Employee saved successfully!"
      success.value = true
      form.value = { name: '', email: '', phone_number: '', education: '', department: '', base_salary: '', bonus: '', deductions: '', note: '', date: '', contract: null }
    } else {
      message.value = "Error saving employee"
      success.value = false
    }
  } catch (err) {
    console.error(err.response?.data || err.message)
    message.value = "Server error: " + (err.response?.data || err.message)
    success.value = false
  }
}
</script>
