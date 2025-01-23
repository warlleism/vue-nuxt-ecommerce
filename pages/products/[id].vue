<template>
    <div class="p-8 flex flex-col ">
        <div v-if="product"
            class="flex flex-col md:flex-row justify-center items-start gap-8 p-8 w-[70%] mx-auto bg-[#f2f2f2] rounded-lg">
            <div class="w-full md:w-1/2 bg-[#f2f2f2] rounded-lg p-8 flex justify-center items-center">
                <img v-if="product.img" :src="product.img" alt="Product Image"
                    class="w-[300px] h-[300px] object-contain">
            </div>
            <div class="w-full md:w-1/2 flex flex-col gap-6">
                <div class="flex flex-col gap-2">
                    <span class="text-orange-300 text-sm font-semibold">{{ product.enterprise }}</span>
                    <h2 class="text-3xl font-bold text-gray-800">{{ product.title }}</h2>
                    <span class="text-sm text-gray-500">{{ product.category }}</span>
                </div>
                <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>
                <div class="flex items-end gap-4">
                    <div class="flex flex-col">
                        <span class="text-gray-400 text-sm line-through">
                            R$ {{ product.price ? product.price.toString().replace('.', ',') : '' }}
                        </span>
                        <span class="text-2xl font-bold text-orange-500">
                            R$ {{ product.discont_price ? product.discont_price.toString().replace('.', ',') : '' }}
                        </span>
                    </div>
                    <div class="bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded">
                        -{{ product.discount }}
                    </div>
                </div>
                <div class="flex gap-4">
                    <button @click="addToCart(product)"
                        class="flex-1 bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                        <Icon name="clarity:shopping-cart-solid" />
                        Adicionar ao Carrinho
                    </button>
                    <div @click="cart.toggleCart"
                        class="cursor-pointer flex items-center justify-center gap-2 px-6 py-3 border-2 border-orange-500 text-orange-500 rounded-md hover:bg-orange-50 transition-colors">
                        <Icon name="mdi:cart" size="24" />
                        Ver Carrinho
                    </div>
                </div>
            </div>
        </div>
        <div v-if="loading" class="flex justify-center items-center absolute top-0 left-0 w-full h-full bg-white">
            <Icon name="eos-icons:loading" size="148" class="text-orange-500 animate-spin" />
        </div>
        <Recommended />
        <Toaster />
    </div>

</template>

<script setup>
import { onMounted } from 'vue'
import { useGetOneProduct } from '~/hooks/useGetOneProducts'
import { useCartStore } from '../../stores/useCartStore.ts'
import Recommended from '../../components/recommended/recommended.vue'
import { useToast } from '~/components/toast/useToast'

const cart = useCartStore()
const route = useRoute()
const { product, fetchProduct, loading } = useGetOneProduct()

const addToCart = (product) => {
    const productExists = cart.items.find((item) => item.title === product.title)
    if (!productExists) {
        cart.addItem(product)
        useToast().showToast(`${product.title} adicionado ao carrinho!`)
    } else {
        useToast().showToast(`produto já está no carrinho!`)
    }
}


onMounted(async () => {
    await fetchProduct(route.params.id)
})
</script>
