<template>

    <div>
        <ul v-if="products.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-full p-5">
            <li v-for="product in products" :key="product.id" class="flex flex-col w-full items-center h-[200px] bg-gray-200 rounded-md">
                <img :src="product.img" alt="Product Image" class="w-full h-[100px] object-contain">
                <div>{{ product.title }}</div>
                <div>R$ {{ product.price }}</div>
                <div class="bg-blue-500 p-2 rounded-md w-fit text-white">
                    <NuxtLink :to="`/products/${product.id}`">Ver detalhes</NuxtLink>
                </div>
            </li>
        </ul>
        <p v-else>Carregando produtos...</p>
    </div>
    
</template>

<script setup>
import { onMounted } from 'vue'
import { useProducts } from '~/hooks/useGetProducts'

const { products, fetchProducts } = useProducts()

onMounted(() => {
    fetchProducts()
})

</script>