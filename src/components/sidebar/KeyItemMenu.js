import * as dialog from 'constants/dialogTypes'
import { openDialog } from 'actions/dialogActions'
import { openConfirmDeleteKeyDialog } from 'actions/dialogActions'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Delete from 'material-ui/svg-icons/action/delete'
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import IconButtonElement from '../utils/IconButtonElement'

const anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
}

const targetOrigin = {
    vertical: 'top',
    horizontal: 'left',
}

export class KeyItemMenu extends Component {
    deleteKey(namespace, key) {
        this.props.deleteKeyInNamespace(namespace, key)
    }

    render() {
        const {
            namespace,
            keyName,
            deleteKeyInNamespace,
            ...props
        } = this.props
        return (
            <IconMenu
                disableAutoFocus
                anchorOrigin={anchorOrigin}
                targetOrigin={targetOrigin}
                iconButtonElement={<IconButtonElement />}
                {...props}
            >
                <MenuItem
                    leftIcon={<Delete />}
                    onTouchTap={this.deleteKey.bind(this, namespace, keyName)}
                >
                    Delete
                </MenuItem>
            </IconMenu>
        )
    }
}

KeyItemMenu.propTypes = {
    namespace: PropTypes.string,
    keyName: PropTypes.string,
    deleteKeyInNamespace: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
    deleteKeyInNamespace(namespace, key) {
        dispatch(openDialog(dialog.CONFIRM_DELETE_KEY, { namespace, key }))
    },
})

export default connect(null, mapDispatchToProps)(KeyItemMenu)
