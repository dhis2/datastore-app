import React, { PropTypes, Component } from 'react'

import DisplayArea from './DisplayArea';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';

class ValueArea extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    const { value } = this.props;
    return (
      <div className={ 'value-area' }>
        <Toolbar>
          <ToolbarTitle text="Value" />
        </Toolbar>
        <DisplayArea />
      </div>
    )
  }
}

export default ValueArea
