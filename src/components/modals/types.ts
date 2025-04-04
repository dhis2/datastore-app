export interface BaseModalProps {
    closeModal: () => void
    title: string
}

export type ModalType = 'key' | 'namespace'

export interface ModalFieldValues {
    key: string
    namespace?: string
}

export interface CreateModalProps extends BaseModalProps {
    handleCreate: (values: ModalFieldValues) => void
    type: ModalType
}

export interface DeleteModalProps extends BaseModalProps {
    handleDelete: () => void
    type: ModalType
    activeNamespace: string
    activeKey?: string
    deleteNamespace?: boolean
}
