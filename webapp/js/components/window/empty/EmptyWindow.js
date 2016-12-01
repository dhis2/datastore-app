import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import EmptyToolbar from './EmptyToolbar';
import EmptyArea from './EmptyArea';

import '../../../../style/window/window.scss';

class EmptyWindow extends Component {
    render() {
        return (
        <Paper className={'fff-window'}>
            <EmptyToolbar />
            <EmptyArea />
        </Paper>
        );
    }
}

export default EmptyWindow;
