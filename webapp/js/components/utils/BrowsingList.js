import React, { PropTypes, Component } from 'react'

import BrowsingListRow from './BrowsingListRow';

class BrowsingList extends Component {

  constructor(props) {
    super(props)
  }

  render () {

    const { items } = this.props;

    return (
      <div>
          <ul>
            {items.forEach((item, index) => {
                <BrowsingListRow key={ index } />
            })};
          </ul>
      </div>
    )
  }
}

export default BrowsingList;
