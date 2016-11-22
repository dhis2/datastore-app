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
   /* const rightIconMenu = (
        <IconMenu iconButtonElement={iconButtonElement} disableAutoFocus={true}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                  targetOrigin={{vertical: 'top', horizontal: 'left',}}>
          <MenuItem leftIcon={<Delete />} onTouchTap={this.handleDelete.bind(this)}>New Key</MenuItem>
        </IconMenu>
    ); */

    const {text, namespace, event} = this.props;
    const primaryText = (<div style={{overflow: 'hidden', textOverflow:'ellipsis'}}>{text}</div>)
    return (
      <ListItem primaryText={primaryText} leftIcon={<EditorInsertDriveFile />} onClick={() => event(namespace, text)}/>
    );

    /*<ListItem primaryText={<div style={{overflow: 'hidden', textOverflow:'ellipsis'}}>{name}</div>}
              open={open}
              leftIcon={open ? <FileFolderOpen/> : <FileFolder />}
              rightIconButton={rightIconMenu}
              nestedItems={items}

              onTouchTap={this.toggleHandler.bind(this)}
              nestedListStyle={nestedStyle} /> */
  }
}

export default KeyItem;
