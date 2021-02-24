import { PropTypes } from '@dhis2/prop-types'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Delete from 'material-ui/svg-icons/action/delete'
import NoteAdd from 'material-ui/svg-icons/action/note-add'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openDialog } from '../../actions/dialogActions'
import * as dialog from '../../constants/dialogTypes'
import IconButtonElement from '../utils/IconButtonElement'

const anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
}

const targetOrigin = {
    vertical: 'top',
    horizontal: 'left',
}

export class NamespaceItemMenu extends Component {
    createKey(name) {
        this.props.newKey(name)
    }

    deleteNamespace(name) {
        this.props.deleteNamespace(name)
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        const { name, deleteNamespace, newKey, ...props } = this.props

        return (
            <IconMenu
                disableAutoFocus
                iconButtonElement={<IconButtonElement />}
                anchorOrigin={anchorOrigin}
                targetOrigin={targetOrigin}
                {...props}
            >
                <MenuItem
                    leftIcon={<NoteAdd />}
                    onClick={this.createKey.bind(this, name)}
                >
                    New key
                </MenuItem>

                <MenuItem
                    leftIcon={<Delete />}
                    onClick={this.deleteNamespace.bind(this, name)}
                >
                    Delete
                </MenuItem>
            </IconMenu>
        )
    }
}

NamespaceItemMenu.propTypes = {
    deleteNamespace: PropTypes.func,
    name: PropTypes.string,
    newKey: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
    deleteNamespace(namespace) {
        dispatch(openDialog(dialog.CONFIRM_DELETE_NAMESPACE, { namespace }))
    },
    newKey(namespace) {
        dispatch(openDialog(dialog.NEW_KEY, { namespace }))
    },
})

export default connect(null, mapDispatchToProps)(NamespaceItemMenu)
