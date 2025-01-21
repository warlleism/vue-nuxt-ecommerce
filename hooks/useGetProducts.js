import { ref, watch } from 'vue'

export const useProducts = () => {
    const products = ref([])
    const page = ref(1)
    const perPage = ref(16)
    const totalPages = ref(0)
    const loading = ref(true)

    const fetchProducts = async () => {
        try {
            loading.value = true
            const response = await fetch(`https://carolinaiv.vercel.app/product/products?page=${page.value}&pagesize=${perPage.value}`)
            const data = await response.json()
            products.value = data.products
            totalPages.value = data.totalPages
            loading.value = false
        } catch (error) {
            console.error('Error fetching products:', error)
            loading.value = false
        }
    }

    const setPage = (newPage) => {
        page.value = newPage
    }

    watch([page], () => {
        fetchProducts()
    })

    return {
        products,
        fetchProducts,
        page,
        perPage,
        totalPages,
        setPage,
        loading
    }
}