export const useGetRecommended = () => {
    const recommended = ref([])

    const fetchRecommended = async () => {
        try {
            const response = await fetch('https://carolinaiv.vercel.app/product/getRecommended')
            const data = await response.json()
            console.log(data)
            recommended.value = data.products
        } catch (error) {
            console.error('Error fetching recommended products:', error)
        }
    }

    return {
        recommended,
        fetchRecommended
    }
}