<template>
    <div class="w-[70%] mx mx-auto bg-[#fff] rounded-lg p-8">
        <h2 class="text-2xl font-bold mb-4">Recomendados</h2>
        <div
            class="flex overflow-x-auto gap-4 pb-4 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-orange-500 [&::-webkit-scrollbar-thumb]:rounded-full">
            <div v-for="product in recommended" :key="product.id" class="flex-none">
                <NuxtLink :to="`/products/${product.id}`" class="cursor-pointer">
                    <div class="w-48 border rounded-lg p-4">
                        <img :src="product.img" :alt="product.title" class="w-full h-32 object-contain mb-2">
                        <h3 class="font-medium truncate">{{ product.title }}</h3>
                        <p class="text-orange-500 font-bold">R$ {{ product.price.toString().replace('.', ',') }}</p>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>

</template>

<script setup>
import { useGetRecommended } from '~/hooks/useGetRecommended'

const { recommended, fetchRecommended } = useGetRecommended()

onMounted(() => {
    fetchRecommended()
})

</script>
