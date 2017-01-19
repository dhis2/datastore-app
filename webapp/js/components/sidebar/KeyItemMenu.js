import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Delete from 'material-ui/svg-icons/action/delete';
import IconButtonElement from './IconButtonElement';
import History from 'material-ui/svg-icons/action/history';

import { openConfirmDeleteKeyDialog } from '../../actions/dialogActions';


const anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
};

const targetOrigin = {
    vertical: 'top',
    horizontal: 'left',
};

class KeyItemMenu extends Component {

    constructor(props) {
        super(props);
        this.handleDeleteKey = this.handleDeleteKey.bind(this);
    }

    handleDeleteKey(namespace, key) {
        this.props.deleteKeyInNamespace(namespace, key);
    }

    render() {
        const { namespace, keyName, deleteKeyInNamespace, ...props } = this.props;

        return (
            <IconMenu disableAutoFocus
                anchorOrigin={ anchorOrigin }
                targetOrigin={ targetOrigin }
                iconButtonElement={ <IconButtonElement /> }
                {...props}
            >
                <MenuItem containerElement={<Link to={`/history/${namespace}/${keyName}`} />} leftIcon={<History />}>
                    History
                </MenuItem>
                <MenuItem leftIcon={<Delete />} onTouchTap={() => deleteKeyInNamespace(namespace, keyName)}>
                    Delete key
                </MenuItem>
            </IconMenu>
        );
    }
}

KeyItemMenu.propTypes = {
    namespace: PropTypes.string,
    keyName: PropTypes.string,
    deleteKeyInNamespace: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
    deleteKeyInNamespace(namespace, key) {
        dispatch(openConfirmDeleteKeyDialog({ namespace, key }));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(KeyItemMenu);
