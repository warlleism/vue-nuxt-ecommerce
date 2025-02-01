<template>
    <div class="w-full flex flex-col justify-center items-center p-5">
        <h1 class="text-2xl font-bold text-orange-500 mb-5">Resultados para: {{ route.params.title }}</h1>
        <ul v-if="products.length && !loading"
            class="grid w-[100%] grid-cols-1 lg:w-[70%] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5">
            <li v-for="product in products" :key="product.id"
                class="flex flex-col w-full justify-between items-center h-[330px] bg-[#fff] rounded-md shadow-md">
                <div class="w-full h-[128px] bg-[#f2f2f2] flex justify-center items-center">
                    <img :src="product.img" alt="Product Image" class="object-contain h-[100px] w-[100px]">
                </div>
                <div class="flex flex-col justify-center items-center gap-[-2px]">
                    <div class="text-xs text-orange-300 font-semibold">{{ product.enterprise }}</div>
                    <div class="text-xl text-orange-500 font-semibold">{{ product.title }}</div>
                </div>
                <div class="flex flex-row items-center w-full px-4 gap-4">
                    <div class="flex flex-col gap-1">
                        <div class="text-gray-400 text-sm line-through">R$ {{ String(product?.price).replace('.', ',')
                            }}</div>
                        <div class="text-lg font-bold text-orange-500">R$ {{ String(product.discont_price).replace('.',
                            ',') }}</div>
                    </div>
                    <div class="bg-orange-500 text-white text-sm self-end font-bold px-2 py-1 rounded">
                        -{{ product.discount }}
                    </div>
                </div>
                <button
                    class="flex flex-row items-center justify-between w-full h-[40px] border-[2px] border-orange-500 bg-white overflow-hidden">
                    <div @click="addToCart(product)"
                        class="flex items-center justify-center bg-orange-500 h-full w-[30%]">
                        <Icon name="clarity:shopping-cart-solid" style="color: #fff" />
                    </div>
                    <NuxtLink :to="`/products/${product.id}`"
                        class="w-[70%] h-full flex items-center justify-center text-sm text-orange-500 font-semibold hover:bg-[#ff6800] transition-all duration-300">
                        <div class="text-orange hover:text-white w-full h-full flex items-center justify-center">
                            COMPRAR
                        </div>
                    </NuxtLink>
                </button>
            </li>
        </ul>
        <div v-if="loading" class="flex justify-center items-center h-[100vh] w-full">
            <Icon name="eos-icons:loading" size="148" class="text-orange-500 animate-spin" />
        </div>
        <div v-if="!loading && products.length === 0"
            class="flex flex-col justify-center items-center h-[100vh] w-full">
            <Icon name="mdi:information-outline" size="64" class="text-[#ff6800]" />
            <p class="mt-4 text-xl font-semibold text-[#ff6800]">Produto não existe</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '~/stores/useCartStore'
import { useToast } from '~/components/toast/useToast'

const route = useRoute()
const cart = useCartStore()
const products = ref([])
const loading = ref(true)

const fetchProducts = async () => {
    loading.value = true
    try {
        const response = await fetch(`https://carolinaiv.vercel.app/product/getSearch?title=${route.params.title}`)
        const data = await response.json()
        products.value = data.products
        loading.value = false
    } catch (error) {
        console.error('Error fetching products:', error)
        loading.value = false
    } finally {
        loading.value = false
    }
}

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
