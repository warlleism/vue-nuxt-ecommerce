<template>

    <div class="w-full flex flex-col justify-center items-center p-5">
        <ul v-if="products.length && !loading"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 w-[70%]">
            <li v-for="product in products" :key="product.id"
                class="flex flex-col w-full justify-center items-center h-[200px] bg-[#0a0a0a0f] rounded-md shadow-md">
                <img :src="product.img" alt="Product Image" class="w-[100px] h-[70px] object-contain">
                <div>{{ product.title }}</div>
                <div>R$ {{ product?.price.replace('.', ',') }}</div>
                <button
                    class="flex flex-row items-center justify-between w-[150px] h-[40px] border-[1px] border-orange-500 bg-white rounded-md overflow-hidden">
                    <div @click="addToCart(product)"
                        class=" flex items-center justify-center bg-orange-500 h-full w-[30%]">
                        <Icon name="clarity:shopping-cart-solid" style="color: #fff" />
                    </div>
                    <NuxtLink :to="`/products/${product.id}`"
                        class=" w-[70%] h-full flex items-center justify-center  text-sm text-orange-500 font-semibold hover:bg-[#fcb381]  transition-all duration-300">
                        <div class="text-black hover:text-white w-full h-full flex items-center justify-center">
                            COMPRAR
                        </div>
                    </NuxtLink>
                </button>
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
import { useCartStore } from '../../stores/useCartStore.ts'
import { useToast } from '~/components/toast/useToast'

const cart = useCartStore()
const { products, fetchProducts, totalPages, setPage, loading } = useProducts()

const addToCart = (product) => {
    const productExists = cart.items.find((item) => item.title === product.title)
    if (!productExists) {
        cart.addItem(product)
        useToast().showToast(`${product.title} adicionado ao carrinho!`)
    } else {
        useToast().showToast(`produto já está no carrinho!`)
    }
}

onMounted(() => {
    fetchProducts()
})

</script>