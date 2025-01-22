import { defineStore } from 'pinia'

interface CartItem {
    id: string | number;
    title: string;
    description: string;
    enterprise: string;
    img: string;
    category: string;
    price: number;
    discont_price: number;
    discount: number;
    quantity: number
}

export const useCartStore = defineStore('cart', {
    state: () => {
        return {
            items: [] as CartItem[],
            total: 0
        }
    },

    actions: {
        addItem(product: CartItem) {
            const existingItem = this.items.find(item => item.id === product.id)

            if (existingItem) {
                existingItem.quantity++
            } else {
                this.items.push({
                    ...product,
                    quantity: 1
                })
            }
            this.calculateTotal()
        },

        removeItem(productId: string) {
            const index = this.items.findIndex(item => item.id === productId)
            if (index > -1) {
                this.items.splice(index, 1)
                this.calculateTotal()
            }
        },

        updateQuantity(productId: string, quantity: number) {
            const item = this.items.find(item => item.id === productId)
            if (item) {
                item.quantity = quantity
                this.calculateTotal()
            }
        },

        calculateTotal() {
            this.total = this.items.reduce((sum, item) => {
                return sum + (item.price * item.quantity)
            }, 0)
        },

        clearCart() {
            this.items = []
            this.total = 0
        }
    },
})