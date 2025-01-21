<template>
    <div :style="{ transform: showCart ? 'translateX(0)' : 'translateX(100%)' }"
        class="fixed right-0 overflow-y-auto top-0 h-full w-80 bg-white shadow-lg p-4">

        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold">Carrinho</h2>
            <button @click="cart.isOpen = false" class="text-gray-500 hover:text-gray-700">
                <Icon name="mdi:close" size="24" />
            </button>
        </div>

        <div v-if="cart.items.length === 0" class="text-center text-gray-500 mt-8">
            Carrinho vazio
        </div>

        <div v-else>
            <div v-for="item in cart.items" :key="item.id" class="flex gap-2 mb-4 border-b pb-2">
                <img :src="item.img" :alt="item.title" class="w-20 h-20 object-contain">
                <div class="flex-1">
                    <h3 class="font-medium">{{ item.title }}</h3>
                    <p class="text-gray-600">R$ {{ item.price.toString().replace('.', ',') }}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <button @click="cart.decrementItem(item.quantity)" class="text-orange-500">
                            <Icon name="mdi:minus" size="20" />
                        </button>
                        <span>{{ item.quantity }}</span>
                        <button @click="cart.incrementItem(item.quantity)" class="text-orange-500">
                            <Icon name="mdi:plus" size="20" />
                        </button>
                        <button @click="cart.removeItem(item.id)" class="text-red-500 ml-auto">
                            <Icon name="mdi:delete" size="20" />
                        </button>
                    </div>
                </div>
            </div>

            <div class="mt-4 border-t pt-4">
                <div class="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>R$ {{ cart.total.toString().replace('.', ',') }}</span>
                </div>
                <button
                    class="w-full bg-orange-500 text-white py-2 rounded-md mt-4 hover:bg-orange-600 transition-colors">
                    Finalizar Compra
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useCartStore } from '~/stores/useCartStore'

const cart = useCartStore()

const props = defineProps({
  showCart: {
    type: Boolean,
    required: true
  }
})

</script>