<template>
  <div class="[&::-webkit-scrollbar]:hidden">
    <Header />
    <NuxtPage />
    <Toaster />
  </div>
</template>

<script setup>
import Header from '~/components/header/header.vue'
import { Toaster } from 'vue-sonner'

</script>
