import React, { PropTypes, Component } from 'react'

import { connect } from 'react-redux';

import { Spinner } from '../utils/Loaders';
import { OpenFolderIcon, ClosedFolderIcon, ErrorIcon } from '../utils/Icons';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FileFolderOpen from 'material-ui/svg-icons/file/folder-open';
import History from 'material-ui/svg-icons/action/history';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import EditorInsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Delete from 'material-ui/svg-icons/action/delete';
import {grey500, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { openKeyDialog, openConfirmDeleteNamespaceDialog, openConfirmDeleteKeyDialog } from '../../actions/dialogActions';
import { fetchAndDisplayKeyValue, fetchAndToggleNamespace, toggleNamespace, } from '../../actions/actions';


const styles = {
    namespaceItem: {

    },
    keyItemList: {
        marginLeft: '15px'
    },
    innerText: {
        overflow: 'hidden',
        textOverflow:'ellipsis'
    }

}

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltipPosition="bottom-left">
        <MoreVertIcon color={grey500}/>
    </IconButton>
);

class NamespaceItem extends Component {

    static propTypes() {

    }

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleDeleteKey = this.handleDeleteKey.bind(this);
        this.handleHistoryKey = this.handleHistoryKey.bind(this);
        this.constructKeyItem = this.constructKeyItem.bind(this);
        this.renderOpen = this.renderOpen.bind(this);
        this.renderClosed = this.renderClosed.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    toggleHandler = () => {
        const {namespace} = this.props;
        if(!namespace.open) {
            this.props.fetchAndToggleNamespace(namespace.name);
        } else {
            this.props.toggleNamespace(namespace.name);
        }

    };
    
    handleNewKey() {
        this.props.newKey(this.props.namespace.name);
    }

    handleDeleteNamespace() {
        this.props.deleteNamespace(this.props.namespace.name);
    }

    handleHistoryKey() {

    }

    handleDeleteKey(namespace, key) {
        this.props.deleteKeyInNamespace(namespace,key)
    }

    constructKeyItem(item, index) {
        const namespace = this.props.namespace.name;
        const keyItemMenu = (
            <IconMenu iconButtonElement={iconButtonElement} disableAutoFocus={true}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                      targetOrigin={{vertical: 'top', horizontal: 'left'}}>
                <MenuItem leftIcon={<Delete />} onTouchTap={() => this.handleDeleteKey(namespace, item)}>
                    Delete key
                </MenuItem>
                <MenuItem leftIcon={<History />} onTouchTap={() => this.handleHistoryKey(namespace, item)}>
                    History
                </MenuItem>
            </IconMenu>);
        return (<ListItem primaryText={<div style={styles.innerText}>{item}</div>}
                          key={index}
                          rightIconButton={keyItemMenu}
                          leftIcon={<EditorInsertDriveFile />}
                          onTouchTap={() => this.props.fetchAndDisplayKeyValue(namespace,item)}/>
        )

    }

    renderOpen() {
        const {keys, name, open} = this.props.namespace;
        const items = [];

        const rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement} disableAutoFocus={true}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                      targetOrigin={{vertical: 'top', horizontal: 'left'}}>
                <MenuItem leftIcon={<NoteAdd />} onTouchTap={this.handleNewKey.bind(this)}>New key</MenuItem>
                <MenuItem leftIcon={<Delete />} onTouchTap={this.handleDeleteNamespace.bind(this)}>Delete</MenuItem>
            </IconMenu>
        );
        //Populate nestedItems if keys are loaded
        if (keys) {
            Object.keys(keys).forEach((item, index) => {
                items.push(this.constructKeyItem(item,index));
            });
        }

        return (
            <ListItem primaryText={<div style={{overflow: 'hidden', textOverflow:'ellipsis'}}>{name}</div>}
                      open={open}
                      leftIcon={open ? <FileFolderOpen/> : <FileFolder />}
                      rightIconButton={rightIconMenu}
                      nestedItems={items}
                      onTouchTap={this.toggleHandler.bind(this)}
                      nestedListStyle={styles.keyItemList} />
        );
    }

    renderClosed() {
      const { name } = this.props.namespace;
      const { event } = this.props;

        return (
            <ListItem primaryText={name} leftIcon={<FileFolder />} onClick={() => event(name)} />
        );
    }

    renderLoading() {
      const { name } = this.props.namespace;

        return (
            <ListItem primaryText={<div style={styles.innerText}>{name}</div>} leftIcon={<FileFolder />} rightIcon={<MoreVertIcon />}>
                <Spinner/>
            </ListItem>
        );
    }

    renderError() {
      const { name } = this.props.namespace;

        return (
            <ListItem primaryText={name} leftIcon={<FileFolder />}>
                <ErrorIcon/>
            </ListItem>
        );
    }


    render() {
        const { error, fetching, open} = this.props.namespace;

        if (error) {
            return this.renderError();
        }

        if (fetching) {
            return this.renderLoading();
        }

        return this.renderOpen();

    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchAndDisplayKeyValue(namespace, key) {
        dispatch(fetchAndDisplayKeyValue(namespace, key))
    },
    fetchAndToggleNamespace(namespace) {
        dispatch(fetchAndToggleNamespace(namespace));
    },
    toggleNamespace(namespace) {
        dispatch(toggleNamespace(namespace));
    },
    deleteNamespace(namespace) {
        dispatch(openConfirmDeleteNamespaceDialog({namespace}))
    },
    newKey(namespace) {
        dispatch(openKeyDialog({namespace}));
    },
    deleteKeyInNamespace(namespace,key) {
        dispatch(openConfirmDeleteKeyDialog({namespace,key}));
    }
});

export default connect(
    null,
    mapDispatchToProps
)(NamespaceItem)
