import { Center, NoticeBox } from '@dhis2/ui'
import React from 'react'
import { useParams } from 'react-router-dom'
import i18n from '../locales'

const EmptyArea = () => {
    const { store, namespace } = useParams()
    return (
        <>
            {!store && (
                <Center>
                    <NoticeBox title={i18n.t('View namespaces')}>
                        Select a datastore to show namespaces
                    </NoticeBox>
                </Center>
            )}
            {store && !namespace && (
                <Center>
                    <NoticeBox title={i18n.t('View keys')}>
                        Click a namespace to show keys
                    </NoticeBox>
                </Center>
            )}
        </>
    )
}
export default EmptyArea
