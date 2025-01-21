<template>
    <div>
        <h1>Detalhes do Produto</h1>
        <div v-if="product">
            <img :src="product.img" alt="Product Image" class="w-full h-[100px] object-contain">
            <h2>{{ product.title }}</h2>
            <p>{{ product.description }}</p>
            <p>Preço: {{ product.price }}</p>
        </div>
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
