<template>
  <div class="flex h-screen">
    <!-- Sidebar Desktop -->
    <aside class="w-64 bg-gray-800 text-white flex flex-col">
      <div class="p-6 text-xl font-bold">My Dashboard</div>
      <nav class="flex-1">
        <ul>
          <li class="px-6 py-2 hover:bg-gray-700"><router-link to="/home">Dashboard</router-link></li>
          <li class="px-6 py-2 hover:bg-gray-700"><router-link to="/employees">Employees</router-link></li>
          <li class="px-6 py-2 hover:bg-gray-700"><router-link to="/add-employee">Add Employee</router-link></li>
          <li class="px-6 py-2 hover:bg-gray-700"><router-link to="/delete-employee">Delete Employee</router-link></li>
          <li class="px-6 py-2 hover:bg-gray-700"><router-link to="/employee-profile">Employee Profile</router-link></li>
          <li class="px-6 py-2 hover:bg-gray-700"><router-link to="/salary-summary">Salary Summary</router-link></li>
          <li class="px-6 py-2 hover:bg-gray-700"><router-link to="/leave-management">Leaves</router-link></li>
          <li class="px-6 py-2 hover:bg-gray-700"><router-link to="/recover-employees">Recovery</router-link></li>
        </ul>
      </nav>
    </aside>

    <!-- Mobile Navbar -->
    <div class="md:hidden fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-sm flex justify-between items-center px-4 py-3 z-50">
      <h2 class="font-bold dark:text-white">Employees Management</h2>
      <button @click="toggleMobileMenu" class="text-gray-700 dark:text-white focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Sidebar Mobile Drawer -->
    <transition name="slide">
      <aside v-if="mobileMenuOpen" class="md:hidden fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 shadow-lg z-40 p-6">
        <h2 class="font-bold text-lg mb-4 dark:text-white">Menu</h2>
        <ul class="space-y-2">
          <li><router-link @click="closeMobileMenu" to="/home" class="block py-2 px-4 hover:bg-orange-400 rounded">Dashboard</router-link></li>
          <li><router-link @click="closeMobileMenu" to="/employees" class="block py-2 px-4 hover:bg-orange-400 rounded">Employees</router-link></li>
          <li><router-link @click="closeMobileMenu" to="/add-employee" class="block py-2 px-4 hover:bg-orange-400 rounded">Add Employee</router-link></li>
          <li><router-link @click="closeMobileMenu" to="/delete-employee" class="block py-2 px-4 hover:bg-orange-400 rounded">Delete Employee</router-link></li>
          <li><router-link @click="closeMobileMenu" to="/employee-profile" class="block py-2 px-4 hover:bg-orange-400 rounded">Employee Profile</router-link></li>
          <li><router-link @click="closeMobileMenu" to="/leave-management" class="block py-2 px-4 hover:bg-orange-400 rounded">Leaves Management</router-link></li>
          <li><router-link @click="closeMobileMenu" to="/salary-summary" class="block py-2 px-4 hover:bg-orange-400 rounded">Salary Summary</router-link></li>
          <li><router-link @click="closeMobileMenu" to="/recover-employees" class="block py-2 px-4 hover:bg-orange-400 rounded">Trash</router-link></li>
        </ul>
      </aside>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const mobileMenuOpen = ref(false);

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

function closeMobileMenu() {
  mobileMenuOpen.value = false;
}
</script>

<style>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>