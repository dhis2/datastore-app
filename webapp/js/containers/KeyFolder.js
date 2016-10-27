import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { FetchDataStoreKeys} from '../actions/actions.js';
import {Panel } from 'react-bootstrap';
import ListExpandable from "../components/ListExpandable"

const mapStateToProps = (state,ownProps) => {
    return {
        keys: state.api.keys
    }
}
class KeyFolder extends Component {
    componentDidMount() {
        this.props.dispatch(FetchDataStoreKeys(this.props.params.namespace))
            
    }
  render () {
      return (
          <Panel header={this.props.params.namespace}>
              <ListExpandable items={this.props.keys} />
          </Panel>
      );

  }
}
const KeyFold = connect(mapStateToProps)(KeyFolder)
export default KeyFold
