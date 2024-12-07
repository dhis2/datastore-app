import React from 'react'
import { ContextButton, DeleteButton, EditButton } from './buttons/Buttons'
import classes from './Page.module.css'

const Actions = () => {
    return (
        <div className={classes.actionButtons}>
            <EditButton />
            <DeleteButton />
            <ContextButton />
        </div>
    )
}

export default Actions
