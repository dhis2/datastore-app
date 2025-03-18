import { useAlert } from '@dhis2/app-runtime'
import i18n from '../locales'

const useDiscardAlert = () => {
    const discardAlert = useAlert(
        i18n.t('Discard these changes'),
        ({ onConfirm }) => ({
            warning: true,
            actions: [
                {
                    label: i18n.t('Confirm'),
                    onClick: () => onConfirm(),
                },
                {
                    label: i18n.t('Cancel'),
                    onClick: () => discardAlert.hide(),
                },
            ],
        })
    )
    return discardAlert
}

export default useDiscardAlert
