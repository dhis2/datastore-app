import React from 'react'
import classes from '../../App.module.css'
import i18n from '../../locales'
import Editor from '../sections/Editor'
import PanelHeader from '../header/PanelHeader'

const EmptyEditorPanel = () => {
    return (
        <div>
            <PanelHeader>
                <span className={classes.emptyEditorPanelHeader}>
                    <i>{i18n.t('Choose a key to start editing')}</i>
                </span>
            </PanelHeader>
            <div>
                <Editor
                    value={''}
                    handleChange={() => console.log('editor changes')}
                />
            </div>
        </div>
    )
}

export default EmptyEditorPanel
