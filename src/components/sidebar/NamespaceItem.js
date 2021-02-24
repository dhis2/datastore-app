import { PropTypes } from '@dhis2/prop-types'
import { ListItem } from 'material-ui/List'
import FileFolder from 'material-ui/svg-icons/file/folder'
import FileFolderOpen from 'material-ui/svg-icons/file/folder-open'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    fetchAndDisplayKeyValue,
    fetchAndToggleNamespace,
    toggleNamespace,
} from '../../actions'
import { ErrorIcon } from '../utils/Icons'
import { Spinner } from '../utils/Loaders'
import KeyItem from './KeyItem'
import NamespaceItemMenu from './NamespaceItemMenu'

const namespaceItemStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    height: '18px', // fixes clipping when zoomed bug
}

export class NamespaceItem extends Component {
    handleToggleNamespace = (isOpen, name) => {
        if (isOpen) {
            this.props.closeNamespace(name)
        } else {
            this.props.openNamespace(name)
        }
    }

    render() {
        const {
            search,
            namespace: { error, name, fetching, open },
        } = this.props

        if (error) {
            return (
                <ListItem primaryText={name} leftIcon={<FileFolder />}>
                    <ErrorIcon />
                </ListItem>
            )
        }

        // Get a list of elements, filter on search-prop
        const list = Object.keys(this.props.namespace.keys)
            .filter(key => !search || key.toLowerCase().includes(search))
            .map(key => <KeyItem namespace={name} keyName={key} key={key} />)

        let leftIcon = <Spinner />
        if (!fetching) {
            leftIcon = open ? <FileFolderOpen /> : <FileFolder />
        }

        return (
            <ListItem
                primaryText={<div style={namespaceItemStyle}>{name}</div>}
                open={open}
                leftIcon={leftIcon}
                rightIconButton={<NamespaceItemMenu name={name} />}
                nestedItems={list}
                onTouchTap={() => this.handleToggleNamespace(open, name)}
            />
        )
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
}

const mapDispatchToProps = dispatch => ({
    fetchAndDisplayKeyValue(namespace, key) {
        dispatch(fetchAndDisplayKeyValue(namespace, key))
    },
    openNamespace(namespace) {
        dispatch(fetchAndToggleNamespace(namespace))
    },
    closeNamespace(namespace) {
        dispatch(toggleNamespace(namespace))
    },
})

export default connect(null, mapDispatchToProps)(NamespaceItem)
