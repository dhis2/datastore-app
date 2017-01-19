import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import NoteAdd from 'material-ui/svg-icons/action/note-add';
import Delete from 'material-ui/svg-icons/action/delete';
import IconMenu from 'material-ui/IconMenu';
import History from 'material-ui/svg-icons/action/history';
import ShowChart from 'material-ui/svg-icons/editor/show-chart';
import MenuItem from 'material-ui/MenuItem';

import IconButtonElement from './IconButtonElement';
import { openKeyDialog,
         openConfirmDeleteNamespaceDialog } from '../../actions/dialogActions';

const anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
};

const targetOrigin = {
    vertical: 'top',
    horizontal: 'left',
};

class NamespaceItemMenu extends React.Component {

    constructor(props) {
        super(props);

        this.handleNewKey = this.handleNewKey.bind(this);
        this.handleDeleteNamespace = this.handleDeleteNamespace.bind(this);
    }

    handleDeleteNamespace() {
        this.props.deleteNamespace(this.props.name);
    }

    handleNewKey() {
        this.props.newKey(this.props.name);
    }

    render() {
        const { name, ...props } = this.props;

        return (
              <IconMenu disableAutoFocus
                  iconButtonElement={ <IconButtonElement /> }
                  anchorOrigin={ anchorOrigin }
                  targetOrigin={ targetOrigin }
                  {...props}
              >
                  <MenuItem leftIcon={<NoteAdd />} onClick={ this.handleNewKey }>
                      New key
                  </MenuItem>
                  <MenuItem leftIcon={<ShowChart />} containerElement={<Link to={`/stats/${name}`} />}>
                      Statistics
                  </MenuItem>
                  <MenuItem containerElement={<Link to={`/history/${name}`} />} leftIcon={<History />}>
                      History
                  </MenuItem>
                  <MenuItem leftIcon={<Delete />} onTouchTap={ this.handleDeleteNamespace }>
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

const mapDispatchToProps = (dispatch) => ({
    deleteNamespace(namespace) {
        dispatch(openConfirmDeleteNamespaceDialog({ namespace }));
    },
    newKey(namespace) {
        dispatch(openKeyDialog({ namespace }));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(NamespaceItemMenu);
