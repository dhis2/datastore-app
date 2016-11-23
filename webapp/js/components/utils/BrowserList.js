import React, { PropTypes, Component } from 'react'

import BrowsingListRow from './BrowserListRow';

class BrowserList extends Component {

  constructor(props) {
    super(props)
  }

  render () {
    return (
        <ul>
          this.props.children
        </ul>
    )
  }
}

export default BrowserList;
