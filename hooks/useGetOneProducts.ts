import { ref } from 'vue'

export const useGetOneProduct = () => {
    const product = ref([])

    const fetchProduct = async (productId: string) => {
        try {
            const response = await fetch(`https://carolinaiv.vercel.app/product/getOne?id=${productId}`)
            const data = await response.json()
            product.value = data.filteredProducts[0]
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    return {
        product,
        fetchProduct
    }
} 