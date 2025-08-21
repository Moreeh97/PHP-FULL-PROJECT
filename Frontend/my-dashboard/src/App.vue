<template>
  <div class="flex flex-col md:flex-row min-h-screen relative">

    <button
      class="md:hidden p-2 bg-gray-800 text-white fixed top-4 left-4 z-50 rounded"
      @click="toggleSidebar"
    >
      ☰
    </button>

    <div
      v-if="showSidebar"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
      @click="closeSidebar"
    ></div>

    <aside
      class="bg-white shadow-sm z-40 md:z-auto h-full transition-transform duration-300
             fixed md:static top-0 left-0 md:translate-x-0 w-64
             transform md:transform-none"
      :class="{
        '-translate-x-full': !showSidebar,
        'translate-x-0': showSidebar,
        'hidden md:block': !showSidebar && isMobile
      }"
    >
      <Sidebar />
    </aside>

    <div class="flex flex-col flex-1 mt-16 md:mt-0">
      <Header />

      <main class="flex-1 p-4 bg-gray-100 overflow-auto">
        <router-view />
      </main>

      <Footer />
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

const showSidebar = ref(false)
const isMobile = ref(false)

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const closeSidebar = () => {
  showSidebar.value = false
}

onMounted(() => {
  isMobile.value = window.innerWidth < 768
})
</script>
