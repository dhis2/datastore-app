import { Center, NoticeBox } from '@dhis2/ui'
import React from 'react'
import { useParams } from 'react-router-dom'

const EmptyArea = () => {
    const { store, namespace } = useParams()
    return (
        <>
            {!store && (
                <Center>
                    <NoticeBox>
                        <p>Select a datastore to show namespaces</p>
                    </NoticeBox>
                </Center>
            )}
            {store && !namespace && (
                <Center>
                    <NoticeBox>
                        <p>Click a namespace to show keys</p>
                    </NoticeBox>
                </Center>
            )}
        </>
    )
}
export default EmptyArea
