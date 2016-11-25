import React, { Component } from 'react';
import { ModeCommentIconWithText } from '../../utils/Icons';
import Paper from 'material-ui/Paper';
import '../../../../style/valueWindow/valueWindow.scss';

class EmptyArea extends Component {
    render() {
        return (
        <Paper className={'value-container'}>
          <div clsasName="window">
            <ModeCommentIconWithText text={'Select a namespace and a key to edit.'} />
          </div>
        </Paper>
        );
    }
}

export default EmptyArea;
