import { Button } from '@dhis2/ui'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import i18n from '../../locales'
import PanelHeader from '../header/PanelHeader'
import EditorSection from '../sections/EditorSection'

const DataStoreKeyValuesQuery = {
    results: {
        resource: 'dataStore',
        id: ({ key, namespace }: { key: string; namespace: string }) =>
            `${namespace}/${key}`,
    },
}

const UserDataStoreKeyValuesQuery = {
    results: {
        resource: 'userDataStore',
        id: ({ key, namespace }: { key: string; namespace: string }) =>
            `${namespace}/${key}`,
    },
}

const EditorPanel = () => {
    const { key, namespace, store } = useParams()
    const navigate = useNavigate()

    return (
        <div>
            <PanelHeader>
                <span className={classes.editorPanelHeader}>{key}</span>
                <div className={classes.editButtons}>
                    <Button
                        small
                        aria-label={i18n.t('Close')}
                        name="close"
                        onClick={() => {
                            console.log('deselect key and cancel mutation?')
                            navigate(`/${store}/edit/${namespace}`)
                        }}
                        title={i18n.t('Close')}
                    >
                        {i18n.t('Close')}
                    </Button>
                    <Button
                        small
                        aria-label={i18n.t('Save')}
                        name="save"
                        onClick={() => console.log('save changes')}
                        title={i18n.t('Save')}
                        primary
                    >
                        {i18n.t('Save changes')}
                    </Button>
                </div>
            </PanelHeader>
            {store === 'dataStore' && (
                <EditorSection query={DataStoreKeyValuesQuery} />
            )}
            {store === 'userDataStore' && (
                <EditorSection query={UserDataStoreKeyValuesQuery} />
            )}
        </div>
    )
}

export default EditorPanel
