import { useDataEngine } from '@dhis2/app-runtime'

export const useDeleteKeyMutation = ({ key, namespace, store, refetch }) => {
    const engine = useDataEngine()

    const handleDeleteAction = async () => {
        await engine.mutate({
            type: 'delete' as const,
            resource: `${store}/${namespace}`,
            id: key,
        })
        refetch()
    }

    return handleDeleteAction
}

export const useDeleteNamespaceMutation = ({ namespace, store, refetch }) => {
    const engine = useDataEngine()

    const handleDeleteAction = async () => {
        await engine.mutate({
            type: 'delete' as const,
            resource: `${store}`,
            id: namespace,
        })
        refetch()
    }

    return handleDeleteAction
}
