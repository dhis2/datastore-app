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
    showButtons: boolean
}

const EditPanelHeader = ({
    handleClose,
    disableCloseButton,
    handleUpdate,
    loading,
    showButtons,
}: EditPanelHeaderProps) => {
    const { key } = useParams()
    return (
        <PanelHeader>
            <span className={classes.editorPanelKeysLabel}>{key}</span>
            {showButtons && (
                <div className={classes.editorPanelEditButtons}>
                    <Button
                        small
                        aria-label={i18n.t('Close')}
                        name="close"
                        onClick={() => handleClose()}
                        title={i18n.t('Close')}
                        disabled={disableCloseButton}
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
                    >
                        {i18n.t('Save changes')}
                    </Button>
                </div>
            )}
        </PanelHeader>
    )
}

export default EditPanelHeader
