<template>
  <div class="min-h-screen flex items-center justify-center">
    <button
      @click="toggleDarkMode"
      class="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white rounded shadow"
    >
      {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false)
const html = document.documentElement

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    html.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    html.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  if (localStorage.getItem('theme') === 'dark') {
    isDarkMode.value = true
    html.classList.add('dark')
  }
})
</script>
