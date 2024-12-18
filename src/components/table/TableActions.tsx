import React from 'react'
import classes from '../../App.module.css'
import DeleteAction from './DeleteAction'
import SharingAction from './SharingAction'

// type TableActionProps = {
//     selectedItem?: string
// }

const TableActions = () => {
    return (
        <div className={classes.actionButtons}>
            <SharingAction />
            <DeleteAction />
        </div>
    )
}

export default TableActions
