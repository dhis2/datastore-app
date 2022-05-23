import { PropTypes } from '@dhis2/prop-types'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import Delete from 'material-ui/svg-icons/action/delete.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { openDialog } from '../../actions/dialogActions.js'
import * as dialog from '../../constants/dialogTypes.js'
import IconButtonElement from '../utils/IconButtonElement.js'

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
            // eslint-disable-next-line no-unused-vars
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
                    onClick={this.deleteKey.bind(this, namespace, keyName)}
                >
                    Delete
                </MenuItem>
            </IconMenu>
        )
    }
}

KeyItemMenu.propTypes = {
    deleteKeyInNamespace: PropTypes.func,
    keyName: PropTypes.string,
    namespace: PropTypes.string,
}

const mapDispatchToProps = (dispatch) => ({
    deleteKeyInNamespace(namespace, key) {
        dispatch(openDialog(dialog.CONFIRM_DELETE_KEY, { namespace, key }))
    },
})

export default connect(null, mapDispatchToProps)(KeyItemMenu)
