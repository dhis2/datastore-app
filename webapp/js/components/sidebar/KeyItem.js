import React, { PropTypes, Component } from 'react';
import { hashHistory } from 'react-router';

import { ListItem } from 'material-ui/List';
import EditorInsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file';

import KeyItemMenu from './KeyItemMenu';

const styles = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    height: '18px', // fixes clipping when zoomed bug
};

class KeyItem extends Component {
    render() {
        const { index, namespace, keyName, ...props } = this.props;

        return (
            <ListItem primaryText={<div style={styles}>{ keyName }</div>}
                key={index}
                rightIconButton={<KeyItemMenu keyName={keyName} namespace={namespace} />}
                leftIcon={<EditorInsertDriveFile />}
                onTouchTap={() => hashHistory.push(`/edit/${namespace}/${keyName}`)}
                {...props}
            />
        );
    }
}

KeyItem.propTypes = {
    index: PropTypes.number,
    namespace: PropTypes.string,
    keyName: PropTypes.string,
};

export default KeyItem;
