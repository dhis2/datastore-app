import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import BrowsingList from '../utils/BrowsingList';
import SortBar from '../utils/SortBar'
import '../../../style/utils/lists.scss';

class BrowseWindow extends Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
        <Paper className="value-area">
          <SortBar />
          <DetailedList />
        </Paper>
    )
  }
}

const mapStateToProps = (state) => ({
  items: state.window.browserItems
})

export default connect(
  mapStateToProps
)(BrowseWindow);
