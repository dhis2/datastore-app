import { useAlert } from '@dhis2/app-runtime'
import i18n from '../locales'

type DiscardAlertProps = {
    onConfirm: () => void
    onCancel?: () => void
}

const useDiscardAlert = () => {
    const discardAlert = useAlert(
        i18n.t('Discard these changes'),
        ({ onConfirm, onCancel }: DiscardAlertProps) => ({
            warning: true,
            actions: [
                {
                    label: i18n.t('Confirm'),
                    onClick: () => onConfirm(),
                },
                {
                    label: i18n.t('Cancel'),
                    onClick: () => {
                        discardAlert.hide()
                        onCancel?.()
                    },
                },
            ],
        })
    )
    return discardAlert
}

export default useDiscardAlert
