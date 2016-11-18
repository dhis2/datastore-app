import React, { PropTypes, Component } from 'react'
import { FileIcon } from '../utils/Icons';
import {ListItem} from 'material-ui/List';

class KeyItem extends Component {

  static propTypes = {
    text: PropTypes.string
  };

  constructor (props) {
    super(props);
  }

  render () {
    const {text, namespace, event} = this.props;
    return (
      <ListItem primaryText={text} leftIcon={<FileIcon/>} onClick={() => event(namespace, text)}/>
    );
  }
}

export default KeyItem;
