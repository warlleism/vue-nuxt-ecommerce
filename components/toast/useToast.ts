import { toast } from 'vue-sonner'

export const useToast = () => {
    
    const showToast = (message: string) => {
        toast(message, {
            position: 'top-left',
            style: {
                fontWeight: 'normal',
                fontSize: '16px',
                color: 'orange',
            }
        })
    }

    return {
        showToast
    }
}