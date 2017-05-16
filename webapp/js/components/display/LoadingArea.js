import React, {Component} from 'react';
import {Spinner} from '../utils/Loaders';
import Paper from 'material-ui/Paper';

const alignmentStyle = {
    alignItems: 'center',
    justifyContent: 'center',
};

class LoadingArea extends Component {
    render() {
        return (
            <Paper zDepth={0} className={'fff-display-area'} style={alignmentStyle}>
                <Spinner size={'large'}/>
            </Paper>
        );
    }
}

export default LoadingArea;
