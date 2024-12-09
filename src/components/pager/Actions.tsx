import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ContextButton, DeleteButton, EditButton } from './buttons/Buttons'
import classes from './Page.module.css'

const Actions = () => {
    const navigate = useNavigate()
    const { namespace } = useParams()
    return (
        <div className={classes.actionButtons}>
            <EditButton
                handleClick={() => {
                    if (namespace) {
                        navigate(`key`)
                    } else {
                        navigate(`edit/namespace`)
                    }
                }}
            />
            <DeleteButton />
            <ContextButton />
        </div>
    )
}

export default Actions
