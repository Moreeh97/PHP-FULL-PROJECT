<template>
  <div class="p-6 mx-auto space-y-6 max-w-4xl">
    <h2 class="text-2xl font-bold text-gray-800">Leaves Management</h2>

    <!-- Request Leave -->
    <div class="bg-white shadow rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-4">Request Leave</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm mb-1">Select Employee:</label>
          <select v-model="leaveRequest.name" class="w-full border p-2 rounded">
            <option value="" disabled>Select employee</option>
            <option v-for="emp in employees" :key="emp.name" :value="emp.name">
              {{ emp.name }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm mb-1">From Date:</label>
          <input type="date" v-model="leaveRequest.from" class="w-full border p-2 rounded" />
        </div>

        <div>
          <label class="block text-sm mb-1">To Date:</label>
          <input type="date" v-model="leaveRequest.to" class="w-full border p-2 rounded" />
        </div>

        <div class="sm:col-span-2">
          <label class="block text-sm mb-1">Reason:</label>
          <textarea v-model="leaveRequest.reason" rows="3" class="w-full border p-2 rounded"></textarea>
        </div>
      </div>

      <div class="mt-4 flex justify-end">
        <button 
          @click="submitLeave"
          class="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded shadow"
        >
          Submit
        </button>
      </div>
    </div>

    <!-- Filter -->
    <div class="bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4">
      <label class="text-sm font-medium">Filter by Employee:</label>
      <input 
        v-model="filterName" 
        type="text" 
        class="flex-1 border p-2 rounded w-full sm:w-auto" 
        placeholder="Employee name..." 
      />
    </div>

    <!-- Leave Requests -->
    <div class="bg-white shadow rounded-lg p-6">
      <h3 class="text-lg font-semibold mb-4">Leave Requests</h3>

      <div v-if="filteredLeaves.length > 0" class="grid gap-4">
        <div 
          v-for="(leave, index) in filteredLeaves" 
          :key="index" 
          class="border rounded-lg p-4 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center"
        >
          <div class="space-y-1">
            <p><strong>Employee:</strong> {{ leave.name }}</p>
            <p><strong>From:</strong> {{ leave.from }} | <strong>To:</strong> {{ leave.to }}</p>
            <p><strong>Reason:</strong> {{ leave.reason }}</p>
          </div>

          <button 
            @click="deleteLeave(index)"
            class="mt-3 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm shadow"
          >
            Delete
          </button>
        </div>
      </div>

      <p v-else class="text-gray-500 text-center">No leave requests found.</p>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'

// Employees from localStorage
const employees = ref([])

// All leave requests
const leaves = ref([])

// Form data
const leaveRequest = ref({
  name: '',
  from: '',
  to: '',
  reason: ''
})

// Filter text
const filterName = ref('')

// Load data on mount
onMounted(() => {
  employees.value = JSON.parse(localStorage.getItem('employees') || '[]')
  leaves.value = JSON.parse(localStorage.getItem('leaves') || '[]')
})

// Submit leave
const submitLeave = () => {
  if (!leaveRequest.value.name || !leaveRequest.value.from || !leaveRequest.value.to || !leaveRequest.value.reason) {
    alert('Please fill all fields.')
    return
  }

  leaves.value.push({ ...leaveRequest.value })
  localStorage.setItem('leaves', JSON.stringify(leaves.value))

  // Reset form
  leaveRequest.value = { name: '', from: '', to: '', reason: '' }
}

// Delete leave
const deleteLeave = (index) => {
  if (confirm('Are you sure you want to delete this leave request?')) {
    leaves.value.splice(index, 1)
    localStorage.setItem('leaves', JSON.stringify(leaves.value))
  }
}

// Filtered leaves
const filteredLeaves = computed(() => {
  if (!filterName.value.trim()) return leaves.value
  return leaves.value.filter(l => l.name.toLowerCase().includes(filterName.value.toLowerCase()))
})
</script>
