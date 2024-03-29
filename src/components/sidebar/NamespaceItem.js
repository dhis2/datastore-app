import { PropTypes } from '@dhis2/prop-types'
import { ListItem } from 'material-ui/List'
import ErrorIcon from 'material-ui/svg-icons/alert/error.js'
import FileFolderOpen from 'material-ui/svg-icons/file/folder-open.js'
import FileFolder from 'material-ui/svg-icons/file/folder.js'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    fetchAndToggleNamespace,
    toggleNamespace,
} from '../../actions/index.js'
import { Spinner } from '../utils/Loaders.js'
import KeyItem from './KeyItem.js'
import NamespaceItemMenu from './NamespaceItemMenu.js'

/* eslint-disable react/sort-prop-types */

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
            .filter((key) => !search || key.toLowerCase().includes(search))
            .map((key) => <KeyItem namespace={name} keyName={key} key={key} />)

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
                onClick={() => this.handleToggleNamespace(open, name)}
            />
        )
    }
}

NamespaceItem.propTypes = {
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

const mapDispatchToProps = (dispatch) => ({
    openNamespace(namespace) {
        dispatch(fetchAndToggleNamespace(namespace))
    },
    closeNamespace(namespace) {
        dispatch(toggleNamespace(namespace))
    },
})

export default connect(null, mapDispatchToProps)(NamespaceItem)
