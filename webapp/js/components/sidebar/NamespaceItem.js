import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../utils/Loaders';
import { ErrorIcon } from '../utils/Icons';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FileFolderOpen from 'material-ui/svg-icons/file/folder-open';
import History from 'material-ui/svg-icons/action/history';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import { ListItem } from 'material-ui/List';
import EditorInsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Delete from 'material-ui/svg-icons/action/delete';
import ShowChart from 'material-ui/svg-icons/editor/show-chart';
import { grey500 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { Link, hashHistory } from 'react-router';
import { openKeyDialog,
         openConfirmDeleteNamespaceDialog,
         openConfirmDeleteKeyDialog } from '../../actions/dialogActions';
import { fetchAndDisplayKeyValue,
         fetchAndToggleNamespace,
         toggleNamespace } from '../../actions/actions';


const styles = {
    namespaceItem: {

    },
    keyItemList: {
        marginLeft: '15px',
    },
    innerText: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
};

const iconButtonElement = (
    <IconButton
        touch
        tooltipPosition="bottom-left"
    >
        <MoreVertIcon color={ grey500 } />
    </IconButton>
);

class NamespaceItem extends Component {
    constructor(props) {
        super(props);

        this.constructKeyItem = this.constructKeyItem.bind(this);
        this.handleNewKey = this.handleNewKey.bind(this);
        this.handleDeleteNamespace = this.handleDeleteNamespace.bind(this);
        this.renderOpen = this.renderOpen.bind(this);
        this.renderError = this.renderError.bind(this);
        this.toggleHandler = this.toggleHandler.bind(this);
    }

    toggleHandler() {
        const { openNamespace, closeNamespace, namespace: { open, name } } = this.props;
        if (!open) {
            openNamespace(name);
        } else {
            closeNamespace(name);
        }
    }

    handleNewKey() {
        this.props.newKey(this.props.namespace.name);
    }

    handleDeleteNamespace() {
        this.props.deleteNamespace(this.props.namespace.name);
    }

    handeDeleteKey() {
        this.props.deleteNamespace(this.props.namespace.name);
    }

    constructKeyItem(key, index) {
        const { deleteKeyInNamespace, namespace: { name: namespace } } = this.props;
        const keyItemMenu = (
            <IconMenu iconButtonElement={iconButtonElement}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                disableAutoFocus
                targetOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <MenuItem containerElement={<Link to={`/history/${namespace}/${key}`} />} leftIcon={<History />}>
                    History
                </MenuItem>
                <MenuItem leftIcon={<Delete />} onTouchTap={() => deleteKeyInNamespace(namespace, key)}>
                    Delete key
                </MenuItem>
            </IconMenu>);
        return (
          <ListItem primaryText={<div style={styles.innerText}>{ key }</div>}
              key={index}
              rightIconButton={keyItemMenu}
              leftIcon={<EditorInsertDriveFile />}
              onTouchTap={() => hashHistory.push(`/edit/${namespace}/${key}`)}
          />
        );
    }

    renderOpen() {
        const { namespace: { keys, name, open, fetching } } = this.props;
        const items = [];

        const rightIconMenu = (
            <IconMenu disableAutoFocus iconButtonElement={ iconButtonElement }
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                targetOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <MenuItem leftIcon={<NoteAdd />} onTouchTap={ this.handleNewKey }>
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

        // Populate nestedItems if keys are loaded
        if (keys) {
            Object.keys(keys).forEach((item, index) => {
                items.push(this.constructKeyItem(item, index));
            });
        }

        let leftIcon = open ? (<FileFolderOpen />) : (<FileFolder />);

        if (fetching) {
            leftIcon = (<Spinner />);
        }

        return (
            <ListItem primaryText={<div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</div>}
                open={open}
                leftIcon={leftIcon}
                rightIconButton={rightIconMenu}
                nestedItems={items}
                onTouchTap={this.toggleHandler}
                nestedListStyle={styles.keyItemList}
            />
        );
    }

    renderError() {
        const { name } = this.props.namespace;

        return (
            <ListItem primaryText={name} leftIcon={<FileFolder />}>
                <ErrorIcon />
            </ListItem>
        );
    }


    render() {
        const { error } = this.props.namespace;

        if (error) {
            return this.renderError();
        }

        return this.renderOpen();
    }
}

NamespaceItem.propTypes = {
    fetchAndDisplayKeyValue: PropTypes.func,
    openNamespace: PropTypes.func,
    closeNamespace: PropTypes.func,
    deleteNamespace: PropTypes.func,
    newKey: PropTypes.func,
    deleteKeyInNamespace: PropTypes.func,
    event: PropTypes.func,
    namespace: PropTypes.shape({
        error: PropTypes.bool,
        fetching: PropTypes.bool,
        open: PropTypes.bool,
        name: PropTypes.string,
        keys: PropTypes.object,
    }),
};


const mapDispatchToProps = (dispatch) => ({
    fetchAndDisplayKeyValue(namespace, key) {
        dispatch(fetchAndDisplayKeyValue(namespace, key));
    },
    openNamespace(namespace) {
        dispatch(fetchAndToggleNamespace(namespace));
    },
    closeNamespace(namespace) {
        dispatch(toggleNamespace(namespace));
    },
    deleteNamespace(namespace) {
        dispatch(openConfirmDeleteNamespaceDialog({ namespace }));
    },
    newKey(namespace) {
        dispatch(openKeyDialog({ namespace }));
    },
    deleteKeyInNamespace(namespace, key) {
        dispatch(openConfirmDeleteKeyDialog({ namespace, key }));
    },
});

export default connect(
    null,
    mapDispatchToProps
)(NamespaceItem);
