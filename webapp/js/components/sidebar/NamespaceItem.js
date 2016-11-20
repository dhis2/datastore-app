import React, { PropTypes, Component } from 'react'

import { connect } from 'react-redux';

import { Spinner } from '../utils/Loaders';
import { OpenFolderIcon, ClosedFolderIcon, ErrorIcon } from '../utils/Icons';
import KeyItem from './KeyItem'
import {ListItem} from 'material-ui/List';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FileFolderOpen from 'material-ui/svg-icons/file/folder-open';
import { fetchAndDisplayKeyValue, fetchAndToggleNamespace, toggleNamespace } from '../../actions/actions';

class NamespaceItem extends Component {

    static propTypes() {

    }

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.renderOpen = this.renderOpen.bind(this);
        this.renderClosed = this.renderClosed.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    toggleHandler = () => {
        const {namespace} = this.props;
        /*this.setState({
            open: !this.state.open,
        }, () => {
            if (this.state.open) {
                this.props.event(this.props.namespace.name);
            }
        });*/

        if(!namespace.open) {
            this.props.fetchAndToggleNamespace(namespace.name);
        } else {
            this.props.toggleNamespace(namespace.name);
        }

    };

    renderOpen() {
        const {keys, name, open} = this.props.namespace, {event, fetchAndDisplayKeyValue} = this.props;
        const items = [];

        if (keys) {
            Object.keys(keys).forEach((item, index) => {
                items.push(<KeyItem key={ index } namespace={ name }
                                    text={ item }
                                    event={ fetchAndDisplayKeyValue }/>);
            });
        }

        return (
            <ListItem primaryText={name}
                      open={open}
                      leftIcon={open ? <FileFolderOpen/> : <FileFolder />}
                      nestedItems={items} onClick={this.toggleHandler.bind(this)} />
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
            <ListItem primaryText={name} leftIcon={<FileFolder />}>
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
    }
});

export default connect(
    null,
    mapDispatchToProps
)(NamespaceItem)
