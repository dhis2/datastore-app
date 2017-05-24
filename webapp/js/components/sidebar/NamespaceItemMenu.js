import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import Delete from 'material-ui/svg-icons/action/delete';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButtonElement from 'components/utils/IconButtonElement';
import { openDialog } from 'actions/dialogActions';
import * as dialog from 'constants/dialogTypes';

const anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
};

const targetOrigin = {
    vertical: 'top',
    horizontal: 'left',
};

export class NamespaceItemMenu extends Component {


    createKey(name) {
        this.props.newKey(name);
    }

    deleteNamespace(name) {
        this.props.deleteNamespace(name);
    }

    render() {
        const { name, deleteNamespace, newKey, ...props } = this.props;

        return (
              <IconMenu disableAutoFocus
                  iconButtonElement={<IconButtonElement />}
                  anchorOrigin={anchorOrigin}
                  targetOrigin={targetOrigin}
                  {...props}
              >
                  <MenuItem leftIcon={<NoteAdd />} onTouchTap={this.createKey.bind(this, name)}>
                      New key
                  </MenuItem>

                  <MenuItem leftIcon={<Delete />} onTouchTap={ this.deleteNamespace.bind(this, name) }>
                      Delete
                  </MenuItem>
              </IconMenu>
        );
    }
}

NamespaceItemMenu.propTypes = {
    name: PropTypes.string,
    deleteNamespace: PropTypes.func,
    newKey: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
    deleteNamespace(namespace) {
        dispatch(openDialog(dialog.CONFIRM_DELETE_NAMESPACE, { namespace }));
    },
    newKey(namespace) {
        dispatch(openDialog(dialog.NEW_KEY, { namespace }));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(NamespaceItemMenu);
