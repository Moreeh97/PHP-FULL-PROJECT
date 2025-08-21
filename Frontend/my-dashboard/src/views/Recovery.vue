<template>
  <div class="p-6 max-w-4xl mx-auto space-y-6">
    <h2 class="text-2xl font-bold mb-4 text-red-600 text-center sm:text-left">
      Trash - Deleted Employees
    </h2>

    <div v-if="trashList.length > 0" class="space-y-4">
      <div class="flex justify-end">
        <button 
          @click="emptyTrash"
          class="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded shadow"
        >
          Empty Trash
        </button>
      </div>

      <div 
        v-for="(emp, index) in trashList" 
        :key="index" 
        class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 border border-orange-400 flex flex-col sm:flex-row justify-between items-start sm:items-center"
      >
        <div class="space-y-1">
          <p><strong>Name:</strong> {{ emp.name }}</p>
          <p><strong>Education:</strong> {{ emp.education }}</p>
          <p><strong>Phone:</strong> {{ emp.phoneNumber }}</p>
          <p><strong>Email:</strong> {{ emp.email }}</p>
          <p><strong>Department:</strong> {{ emp.department }}</p>
          <p><strong>Salary:</strong> {{ emp.baseSalary }}</p>
        </div>

        <div class="mt-3 sm:mt-0 flex gap-3">
          <button 
            @click="restoreEmployee(index)"
            class="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded shadow"
          >
            Restore
          </button>

          <button 
            @click="deletePermanently(index)"
            class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded shadow"
          >
            Delete Permanently
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-gray-500 text-center mt-6">
      No deleted employees in trash.
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const trashList = ref([])

const loadTrash = () => {
  trashList.value = JSON.parse(localStorage.getItem('trashEmployees') || '[]')
}

const restoreEmployee = (index) => {
  const employee = trashList.value[index]

  const employees = JSON.parse(localStorage.getItem('employees') || '[]')
  employees.push(employee)
  localStorage.setItem('employees', JSON.stringify(employees))

  trashList.value.splice(index, 1)
  localStorage.setItem('trashEmployees', JSON.stringify(trashList.value))

  alert(' The employee recovered done  ')
}

const deletePermanently = (index) => {
  if (confirm('Are you sure you want to delete the employee permanently? ')) {
    trashList.value.splice(index, 1)
    localStorage.setItem('trashEmployees', JSON.stringify(trashList.value))
    alert('Deleted is Done ! ')
  }
}

const emptyTrash = () => {
  if (confirm('Do you want to empty the basket completely?')) {
    trashList.value = []
    localStorage.removeItem('trashEmployees')
    alert('The trash has been emptied.')
  }
}

onMounted(() => {
  loadTrash()
})
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
