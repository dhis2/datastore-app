import React, { PropTypes, Component } from 'react'
import { FileIcon } from '../utils/Icons';
import {ListItem} from 'material-ui/List';
import EditorInsertDriveFile from 'material-ui/svg-icons/editor/insert-drive-file';

class KeyItem extends Component {

  static propTypes = {
    text: PropTypes.string
  };

  constructor (props) {
    super(props);
  }

  render () {
    const {text, namespace, event} = this.props;
    const primaryText = (<div style={{overflow: 'hidden', textOverflow:'ellipsis'}}>{text}</div>)
    return (
      <ListItem primaryText={primaryText} leftIcon={<EditorInsertDriveFile />} onClick={() => event(namespace, text)}/>
    );
  }
}

export default KeyItem;
