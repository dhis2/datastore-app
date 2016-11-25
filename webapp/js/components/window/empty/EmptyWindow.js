import React, { Component } from 'react';

import Paper from 'material-ui/Paper';

import EmptyToolbar from './EmptyToolbar';
import EmptyArea from './EmptyArea';

import '../../../../style/valueWindow/valueWindow.scss';


class Empty extends Component {
    render() {
        return (
        <Paper className={'value-container'}>
          <EmptyToolbar />
          <EmptyArea />
        </Paper>
        );
    }
}

export default Empty;
