import React, { Component } from 'react';
import { Spinner } from '../utils/Loaders';
import Paper from 'material-ui/Paper';

class LoadingArea extends Component {
    render() {
        return (
      <Paper className={'window-area'}>
          <div className={'window-area'} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Spinner size={'large'} />
          </div>
      </Paper>
        );
    }
}

export default LoadingArea;
