import React, {PropTypes, Component} from 'react'
import {Toolbar, ToolbarTitle, ToolbarGroup} from 'material-ui/Toolbar';
import ContentSave from 'material-ui/svg-icons/content/save';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';

import EmptyToolbar from './EmptyToolbar';
import EmptyArea from './EmptyArea';

import '../../../style/valueWindow/valueWindow.scss';


class Empty extends Component {
    render() {
      return (
        <Paper className={'value-container'}>
          <EmptyToolbar />
          <EmptyArea />
        </Paper>
      )
    }
}

export default Empty;
