import React, { PropTypes, Component } from 'react'

import '../../../style/valueWindow/valueWindow.scss';
import WindowTitle from '../general/WindowTitle';
import DisplayArea from './DisplayArea';


class ValueArea extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    const { value } = this.props;
    return (
      <div className={ 'value-container' }>
        <WindowTitle text={ "value" } />
        <DisplayArea />
      </div>
    )
  }
}

export default ValueArea
