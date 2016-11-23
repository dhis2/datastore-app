import React, { PropTypes } from 'react';

import EditWindow from './EditWindow';
import EmptyWindow from './EmptyWindow';
import BrowserWindow from './BrowserWindow';

import { ModeCommentIconWithText } from '../utils/Icons';
import Paper from 'material-ui/Paper';

class WindowManager extends React.Component {

  constructor(props) {
    super(props);

    this.renderEditWindow = this.renderEditWindow.bind(this);
    this.renderEditWindow = this.renderEditWindow.bind(this);
    this.renderDefault = this.renderEmpty.bind(this);
  }

  renderEditWindow() {
    return <EditWindow />
  }

  renderBrowserWindow() {
    return <BrowserWindow />
  }

  renderEmpty() {
    return <EmptyWindow />
  }

  render () {
    switch('edit') {
      case 'edit':
        return this.renderEditWindow();
      case 'browser':
        return this.renderBrowserWindow();
      default:
        return this.renderEmpty();
    }
  }
}


export default WindowManager;
