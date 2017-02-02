import React, { Component } from 'react';
import { Spinner } from '../utils/Loaders';
import Paper from 'material-ui/Paper';

const alignmentStyle = {
    alignItems: 'center',
    justifyContent: 'center',
};

class LoadingArea extends Component {
    render() {
        return (
          <Paper className={'fff-display-area'}>
              <div className={'fff-display-area'} style={ alignmentStyle }>
                <Spinner size={'large'} />
              </div>
          </Paper>
        );
    }
}

export default LoadingArea;
