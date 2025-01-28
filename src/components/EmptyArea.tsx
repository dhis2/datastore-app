import { Center, NoticeBox } from '@dhis2/ui'
import React from 'react'
import { useParams } from 'react-router-dom'
import i18n from '../locales'

const EmptyArea = () => {
    const { store, namespace } = useParams()
    return (
        <>
            {store && !namespace && (
                <Center>
                    <NoticeBox title={i18n.t('View keys')}>
                        {i18n.t('Click a namespace to view its keys')}
                    </NoticeBox>
                </Center>
            )}
        </>
    )
}
export default EmptyArea
