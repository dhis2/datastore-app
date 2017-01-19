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

        this.toggleHandler = this.toggleHandler.bind(this);

        this.state = {
            list: Object.keys(props.namespace.keys),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.namespace.keys !== this.props.namespace.keys) {
            this.setState({
                list: Object.keys(nextProps.namespace.keys),
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

    render() {
        const { search, namespace: { error, name, fetching, open } } = this.props;

        if (error) {
            return (
                <ListItem primaryText={name} leftIcon={<FileFolder />}>
                    <ErrorIcon />
                </ListItem>
            );
        }

        let leftIcon;

        // Get a list of elements, filter on search-prop
        const list = this.state.list
            .filter(key => key.toLowerCase().includes(search || ''))
            .map((key, index) => <KeyItem namespace={name} keyName={key} key={key.concat(index)} />);

        if (fetching) {
            leftIcon = (<Spinner />);
        } else {
            leftIcon = open ? (<FileFolderOpen />) : (<FileFolder />);
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
}

NamespaceItem.propTypes = {
    fetchAndDisplayKeyValue: PropTypes.func,
    openNamespace: PropTypes.func,
    closeNamespace: PropTypes.func,
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
