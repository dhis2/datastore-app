import { PropTypes } from '@dhis2/prop-types'
import { ListItem } from 'material-ui/List'
import EditorInsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file'
import React, { Component } from 'react'
import { hashHistory, withRouter } from 'react-router'
import KeyItemMenu from './KeyItemMenu'

const styles = {
    primaryText: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        height: '18px', // fixes clipping when zoomed bug
    },

    selectedKey: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
}

export class KeyItem extends Component {
    render() {
        const {
            index,
            namespace,
            keyName,
            // eslint-disable-next-line no-unused-vars
            router,
            params,
            // eslint-disable-next-line no-unused-vars
            routes,
            // eslint-disable-next-line no-unused-vars
            location,
            ...props
        } = this.props
        const isSelected =
            params.namespace === namespace && params.key === keyName
        return (
            <ListItem
                primaryText={<div style={styles.primaryText}>{keyName}</div>}
                key={index}
                rightIconButton={
                    <KeyItemMenu namespace={namespace} keyName={keyName} />
                }
                leftIcon={<EditorInsertDriveFile />}
                onClick={() =>
                    hashHistory.push(`/edit/${namespace}/${keyName}`)
                }
                style={isSelected ? styles.selectedKey : {}}
                {...props}
            />
        )
    }
}

KeyItem.propTypes = {
    index: PropTypes.number,
    keyName: PropTypes.string,
    location: PropTypes.any,
    namespace: PropTypes.string,
    params: PropTypes.any,
    router: PropTypes.any,
    routes: PropTypes.any,
}

export default withRouter(KeyItem)
