import { Button } from '@dhis2/ui'
import React from 'react'
import { useParams } from 'react-router-dom'
import classes from '../../App.module.css'
import i18n from '../../locales'
import PanelHeader from './PanelHeader'

type EditPanelHeaderProps = {
    handleClose: () => void
    disableCloseButton: boolean
    handleUpdate: () => void
    loading: boolean
}

const EditPanelHeader = ({
    handleClose,
    disableCloseButton,
    handleUpdate,
    loading,
}: EditPanelHeaderProps) => {
    const { key } = useParams()
    return (
        <PanelHeader>
            <span
                className={classes.editorPanelKeysLabel}
                data-test="editor-panel-key-label"
            >
                {key}
            </span>
            <div className={classes.editorPanelEditButtons}>
                <Button
                    small
                    aria-label={i18n.t('Close')}
                    name="close"
                    onClick={() => handleClose()}
                    title={i18n.t('Close')}
                    disabled={disableCloseButton}
                    dataTest="close-editor-button"
                >
                    {i18n.t('Close')}
                </Button>
                <Button
                    small
                    aria-label={i18n.t('Save')}
                    name="save"
                    onClick={() => handleUpdate()}
                    title={i18n.t('Save')}
                    primary
                    loading={loading}
                    dataTest="save-changes-button"
                >
                    {i18n.t('Save changes')}
                </Button>
            </div>
        </PanelHeader>
    )
}

export default EditPanelHeader
