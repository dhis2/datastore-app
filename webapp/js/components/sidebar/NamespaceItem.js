import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from '../utils/Loaders';
import { ErrorIcon } from '../utils/Icons';
import FileFolder from 'material-ui/svg-icons/file/folder';
import FileFolderOpen from 'material-ui/svg-icons/file/folder-open';
import { ListItem } from 'material-ui/List';
import { fetchAndDisplayKeyValue,
         fetchAndToggleNamespace,
         toggleNamespace } from '../../actions/actions';

import NamespaceItemMenu from './NamespaceItemMenu';
import KeyItem from './KeyItem';


const namespaceItemStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    height: '18px', // fixes clipping when zoomed bug
};

class NamespaceItem extends Component {
    constructor(props) {
        super(props);

        this.constructKeyItem = this.constructKeyItem.bind(this);
        this.renderOpen = this.renderOpen.bind(this);
        this.renderError = this.renderError.bind(this);
        this.toggleHandler = this.toggleHandler.bind(this);
        this.filterKey = this.filterKey.bind(this);

        this.state = {
            list: Object.keys(props.namespace.keys).map(key => {
                return {
                    key,
                    elem: this.constructKeyItem(key, key),
                };
            }),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.namespace.keys !== this.props.namespace.keys) {
            this.setState({
                list: Object.keys(nextProps.namespace.keys).map(key => {
                    return {
                        key,
                        elem: this.constructKeyItem(key, key),
                    };
                }),
            });
        }
    }

    toggleHandler() {
        const { openNamespace, closeNamespace, namespace: { open, name } } = this.props;
        if (!open) {
            openNamespace(name);
        } else {
            closeNamespace(name);
        }
    }

    filterKey(item) {
        const searchValue = this.props.search || '';
        return item.toLowerCase().includes(searchValue);
    }

    constructKeyItem(key, index) {
        const { namespace: { name: namespace } } = this.props;
        return (
          <KeyItem namespace={namespace} keyName={key} key={index} />
        );
    }

    renderOpen() {
        const { namespace: { name, open, fetching } } = this.props;

        // Get a list of elements, filter on search-prop
        const list = this.state.list.filter(item => this.filterKey(item.key))
            .map(item => item.elem);
        let leftIcon = open ? (<FileFolderOpen />) : (<FileFolder />);

        if (fetching) {
            leftIcon = (<Spinner />);
        }

        return (
            <ListItem primaryText={<div style={namespaceItemStyle}>{name}</div>}
                open={open}
                leftIcon={leftIcon}
                rightIconButton={<NamespaceItemMenu name={name} />}
                nestedItems={list}
                onTouchTap={this.toggleHandler}
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
    event: PropTypes.func,
    search: PropTypes.string,
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
});

export default connect(
    null,
    mapDispatchToProps
)(NamespaceItem);
