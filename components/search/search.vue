<template>
    <div id="search" class="flex items-center justify-between h-10 overflow-hidden rounded-md border border-gray-300 ">
        <input @input="handleSearch($event)" type="text" placeholder="Buscar produtos..."
            class="w-full h-full outline-none pl-2">
        <button
            class=" h-full w-[40px] border-l-2 border-gray-300 text-gray-400 hover:text-orange-500  flex items-center justify-center">
            <Icon name="mdi:magnify" size="24" />
        </button>
        <div v-if="searchResults.length > 0"
            class="absolute top-10 left-0 w-full h-auto z-50 bg-[#fff] p-5 gap-5 flex flex-col border border-gray-300 rounded-md">
            <NuxtLink @click="searchResults = []" :to="`/products/${product.id}`" v-for="product in searchResults"
                :key="product.id"
                class="flex flex-row justify-between items-center gap-2 border-b border-[#ecedf0] pb-2">
                <div class="flex flex-row items-center gap-2">
                    <img :src="product.img" alt="Product Image" class="w-10 h-10 object-contain">
                    <p class="text-sm font-semibold text-orange-600">{{ product.title }}</p>
                </div>
                <p v-if="product.discount" class="bg-orange-500 text-white font-semibold rounded-md p-1">-{{
                    product.discount }}</p>
            </NuxtLink>
            <div class="flex items-center justify-start">
                <NuxtLink @click="searchResults = []" :to="`/detailAll/${searchText}`" class="text-orange-500 font-semibold">Ver
                    todos...</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const searchResults = ref([])
const searchText = ref('')

let timeoutId = null

const handleSearch = async (event) => {
    if (searchResults.value.length > 0) {
        searchResults.value = []
    }
    if (timeoutId) {
        clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(async () => {
        const searchTerm = event.target.value
        searchText.value = searchTerm
        if (searchTerm) {
            try {
                const response = await fetch(`https://carolinaiv.vercel.app/product/getSearch?title=${searchTerm}`)
                const data = await response.json()
                searchResults.value = data.products
            } catch (error) {
                console.error('Error searching products:', error)
            }
        }
    }, 1000)
}
onMounted(() => {
    document.addEventListener('click', (event) => {
        const searchElement = document.getElementById('search')
        if (!searchElement.contains(event.target)) {
            searchResults.value = []
        }
    })
})


</script>
