import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux';
import KeyListItem from './KeyListItem';

import { fetchAndDisplayKeyValue } from '../../actions/actions';

class KeyList extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { items, namespace, fetchAndDisplayKeyValue } = this.props
    return(
      <ul>
        {Object.keys(items).map((item, index) => (
            <KeyListItem key={ index } namespace={ namespace } text={ item } event={ fetchAndDisplayKeyValue }  />
        ))}
      </ul>
    )
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  fetchAndDisplayKeyValue(namespace, key) {
    dispatch(fetchAndDisplayKeyValue(namespace, key))
  }
});


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyList);
