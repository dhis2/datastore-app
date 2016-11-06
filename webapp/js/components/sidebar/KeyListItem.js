import React, { PropTypes, Component } from 'react'

import '../../../style/sidebar/keylist.scss';
import { FileIcon } from '../utils/Icons';

class KeyListItem extends Component {

  static propTypes = {
    text: PropTypes.string
  }

  constructor (props) {
    super(props);
  }

  render () {
    const {text, namespace, event} = this.props;
    return (
      <li className={'default-key'} onClick={() => event(namespace, text)}>
        <div className={'key-title'} >
          <span className={'folder-icon'}>
            <FileIcon />
          </span>
          <span>{text}</span>
        </div>
      </li>
    )
  }
}

export default KeyListItem;
