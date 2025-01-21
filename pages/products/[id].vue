<template>
    <div v-if="product">
        <img :src="product.img" alt="Product Image" class="w-[100px] h-[100px] object-contain">
        <h2>{{ product.title }}</h2>
        <p>{{ product.description }}</p>
        <p>R$ {{ product.price ? product.price.toString().replace('.', ',') : '' }}</p>
    </div>

    <div v-else class="flex justify-center items-center h-[100vh] w-full">
        <Icon name="eos-icons:loading" size="148" class="text-orange-500 animate-spin" />
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGetOneProduct } from '~/hooks/useGetOneProducts'

const route = useRoute()
const { product, fetchProduct } = useGetOneProduct()
onMounted(async () => {
    await fetchProduct(route.params.id)
})
</script>
