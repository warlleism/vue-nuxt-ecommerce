<template>
    <div v-if="product">
        <img v-if="product.img" :src="product.img" alt="Product Image" class="w-[100px] h-[100px] object-contain">
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <p>R$ {{ product.price ? product.price.toString().replace('.', ',') : '' }}</p>
        <button @click=" cart.addItem(product)"
            class="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
            Adicionar ao Carrinho
        </button>
    </div>
    <div v-else class="flex justify-center items-center h-[100vh] w-full">
        <Icon name="eos-icons:loading" size="148" class="text-orange-500 animate-spin" />
    </div>

    <NuxtLink :to="`/cart`">
        <Icon name="mdi:cart" size="24" />
        <div>carrinho</div>
    </NuxtLink>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGetOneProduct } from '~/hooks/useGetOneProducts'
import { useCartStore } from '../../stores/useCartStore.ts'

const cart = useCartStore()
const route = useRoute()
const { product, fetchProduct } = useGetOneProduct()

onMounted(async () => {
    await fetchProduct(route.params.id)
})
</script>
