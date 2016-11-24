import React, { PropTypes } from 'react';

import EditWindow from './EditWindow';
import EmptyWindow from './EmptyWindow';
import BrowserWindow from './BrowserWindow';

import { ModeCommentIconWithText } from '../utils/Icons';
import Paper from 'material-ui/Paper';

class WindowManager extends React.Component {
  render () {
    switch('browser') {
      case 'edit':
        return <EditWindow />
      case 'browser':
        return <BrowserWindow />
      default:
        return <EmptyWindow />
    }
  }
}

export default WindowManager;
