import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { FetchDataStoreKeys} from '../actions/actions.js';
import List from "../components/List.js"

const mapStateToProps = (state,ownProps) => {
    return {
        namespace: state.api.namespaces[ownProps.params.namespace]
    }
}
class KeyFolder extends Component {
    componentDidMount() {
        console.log("keyfolder")
        this.props.dispatch(FetchDataStoreKeys(this.props.params.namespace))
    }
  render () {
      return (
          <div>
          <h1>{this.props.params.namespace}</h1>
              {/*<List items={this.props.namespace} /> */}
          </div>
      );

  }
}
const KeyFold = connect(mapStateToProps)(KeyFolder)
export default KeyFold
