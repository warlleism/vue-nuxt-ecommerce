<template>

    <div class="w-full flex flex-col justify-center items-center">
        <ul v-if="products.length && !loading"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 w-[70%]">
            <li v-for="product in products" :key="product.id"
                class="flex flex-col w-full items-center h-[200px] bg-[#0a0a0a0f] rounded-md shadow-md">
                <img :src="product.img" alt="Product Image" class="w-[100px] h-[100px] object-contain">
                <div>{{ product.title }}</div>
                <div>R$ {{ product?.price.replace('.', ',') }}</div>
                <Button>
                    <NuxtLink :to="`/products/${product.id}`" class=" w-full h-full flex items-center justify-center ">
                        <div class=" flex items-center justify-center bg-orange-500 h-full w-[40px]">
                            <Icon name="clarity:shopping-cart-solid" style="color: #fff" />
                        </div>
                        <div
                            class="flex items-center justify-center h-full w-[80px] text-sm text-orange-500 hover:text-white font-semibold">
                            COMPRAR
                        </div>
                    </NuxtLink>
                </Button>
            </li>
        </ul>

        <div v-else class="flex justify-center items-center h-[100vh] w-full">
            <Icon name="eos-icons:loading" size="148" class="text-orange-500 animate-spin" />
        </div>

        <div class="flex flex-row justify-center items-center gap-2">
            <button v-for="page in totalPages" :key="page"
                class="bg-orange-500 text-white cursor-pointer p-4 rounded-sm " @click="setPage(page)">{{ page
                }}</button>
        </div>

    </div>

</template>

<script setup>
import { onMounted } from 'vue'
import { useProducts } from '~/hooks/useGetProducts'
import Button from '~/components/buyButton/buyButton.vue'

const { products, fetchProducts, totalPages, setPage, loading } = useProducts()

onMounted(() => {
    fetchProducts()
})

</script>