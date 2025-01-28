import React from 'react'
import { Outlet } from 'react-router-dom'
import classes from '../../App.module.css'
import KeysPanel from '../panels/KeysPanel'

const EditPage = () => {
    return (
        <div className={classes.secondPage}>
            <div className={classes.secondPageContainer}>
                <div className={classes.keysPanel}>
                    <KeysPanel />
                </div>
                <div className={classes.editorPanel}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default EditPage
