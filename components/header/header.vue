<template>
    <div class="h-[100px]">
        <header class="bg-[#f6f6f6] w-full flex justify-end p-5 fixed top-0 transition-transform duration-300">
            <button @click="handleShowCart" class="
            flex 
            items-center 
            justify-center 
            text-orange-500 
            p-3 
            rounded-full 
            border 
            border-orange-500 
            hover:bg-orange-500 
            hover:text-white
            transition-all duration-300
            ">
                <Icon name="mdi:cart" size="24" />
            </button>
            <cart :isOpen="isOpen" :handleShowCart="handleShowCart" :cart="cartStore" />
        </header>
    </div>
</template>

<script setup>

import cart from '../cart/index.vue'
import { ref } from 'vue'
import { useCartStore } from '~/stores/useCartStore'

const cartStore = useCartStore()
const isOpen = ref(false)

const handleShowCart = () => {
    isOpen.value = !isOpen.value
}

</script>