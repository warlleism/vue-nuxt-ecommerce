<template>
    <header>
        <button @click="handleShowCart">
            <Icon name="mdi:cart" size="24" />
        </button>
        <cart :showCart="showCart" />
    </header>
</template>

<script setup>
import cart from '../pages/cart/index.vue'

const showCart = ref(false)

const handleShowCart = () => {
    showCart.value = !showCart.value
}
</script>