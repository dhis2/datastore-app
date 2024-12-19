import { useAlert } from '@dhis2/app-runtime'

const useCustomAlert = () => {
    const { show } = useAlert(
        ({ message }) => message,
        ({ isError }) =>
            isError ? { critical: true } : { success: true, duration: 3000 }
    )
    return {
        showSuccess: (message) => show({ message }),
        showError: (message) => show({ message, isError: true }),
    }
}

export default useCustomAlert
