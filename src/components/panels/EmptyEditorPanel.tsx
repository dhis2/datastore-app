import React from 'react'
import classes from '../../App.module.css'
import i18n from '../../locales'
import PanelHeader from '../header/PanelHeader'

const EmptyEditorPanel = () => {
    return (
        <>
            <PanelHeader>
                <span className={classes.emptyEditorPanelHeader}>
                    <i>{i18n.t('Choose a key to start editing')}</i>
                </span>
            </PanelHeader>
            <div
                className={classes.editorBackground}
                data-test="empty-editor-placeholder"
            />
        </>
    )
}

export default EmptyEditorPanel
