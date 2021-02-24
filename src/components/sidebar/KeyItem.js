import { ListItem } from 'material-ui/List'
import EditorInsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file'
import React, { PropTypes, Component } from 'react'
import { hashHistory } from 'react-router'
import { withRouter } from 'react-router'
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
            router,
            params,
            routes,
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
                onTouchTap={() =>
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
    namespace: PropTypes.string,
    keyName: PropTypes.string,
}

export default withRouter(KeyItem)
