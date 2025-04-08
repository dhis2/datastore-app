import React from 'react'
import { Outlet } from 'react-router-dom'
import classes from '../../App.module.css'
import { EditContextProvider } from '../context/EditContext'
import KeysPanel from '../panels/KeysPanel'

const EditPage = () => {
    return (
        <EditContextProvider>
            <div className={classes.secondPage}>
                <div className={classes.secondPageContainer}>
                    <div className={classes.keysPanel} data-test="keys-panel">
                        <KeysPanel />
                    </div>
                    <div
                        className={classes.editorPanel}
                        data-test="editor-panel"
                    >
                        <Outlet />
                    </div>
                </div>
            </div>
        </EditContextProvider>
    )
}

export default EditPage
