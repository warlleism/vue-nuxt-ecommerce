<template>
    <div class="h-[100px]">
        <header class=" w-full flex justify-between items-center p-5 fixed top-0 transition-transform duration-300">
            <NuxtLink to="/">
                <img :src="logo" alt="Logo" class="w-[50px] h-[50px] object-contain">
            </NuxtLink>

            <button @click="handleShowCart" class="
            flex 
            items-center 
            justify-center 
            text-orange-500 
            p-3 
            rounded-full 
            relative
            transition-all duration-300
            ">
                <Icon name="mdi:cart" size="30" />
                <div
                    class="absolute top-[-5px] right-[-5px] bg-orange-500 p-3 text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {{ cartStore.items.length }}</div>
            </button>
            <cart :isOpen="cartStore.showCart" :handleShowCart="handleShowCart" :cart="cartStore" />
        </header>
    </div>
</template>

<script setup>

import cart from '../cart/index.vue'
import { useCartStore } from '~/stores/useCartStore'
import logo from '~/assets/logo/logo.png'

const cartStore = useCartStore()

const handleShowCart = () => {
    cartStore.toggleCart()
}

</script>