import React, { PropTypes, Component } from 'react'

import '../../../style/main.scss';

class WindowTitle extends Component {

  constructor(props) {
    super(props);
  }

  render () {
    const {text, color} = this.props;
    return (
      <div className={'window-title'}>
        {text.toUpperCase()}
      </div>
    )
  }
}

export default WindowTitle;
