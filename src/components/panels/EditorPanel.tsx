import { Button } from '@dhis2/ui'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import i18n from '../../locales'
import Editor from '../sections/Editor'
import PanelHeader from '../header/PanelHeader'

const EditorPanel = () => {
    const { key, namespace, store } = useParams()
    const navigate = useNavigate()
    const data = {
        results: {
            name: 'Mars Perseverance Rover',
            launch_date: '2020-07-30',
            landing_date: '2021-02-18',
            mission_status: 'active',
        },
    }
    const [value, setValue] = useState(
        JSON.stringify(data?.results, null, 4) || ''
    )

    useEffect(() => {
        setValue(JSON.stringify(data?.results, null, 4))
    }, [data])
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
            <div>
                <Editor
                    value={value}
                    handleChange={() => console.log('editor changes')}
                />
            </div>
        </div>
    )
}

export default EditorPanel
