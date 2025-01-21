import { ref } from 'vue'

export const useProducts = () => {
    const products = ref([])

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://carolinaiv.vercel.app/product/products')
            const data = await response.json()
            products.value = data.products
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    return {
        products,
        fetchProducts
    }
} 