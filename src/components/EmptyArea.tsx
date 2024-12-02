import { Center } from '@dhis2/ui'
import React from 'react'
import { useParams } from 'react-router-dom'

const EmptyArea = () => {
    const { store, namespace } = useParams()
    return (
        <>
            {!store && (
                <Center>
                    <p>Select a datastore to show namespaces</p>
                </Center>
            )}
            {store && !namespace && (
                <Center>
                    <p>Click a namespace to show keys</p>
                </Center>
            )}
        </>
    )
}
export default EmptyArea
