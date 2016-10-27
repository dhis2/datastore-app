import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { FetchDatastoreNamespaces} from '../actions/actions.js';
import List from "../components/List.js"

const mapStateToProps = (state) => {
    return {
        namespaces: state.api.namespaces
    }
}
class Folder extends Component {
    componentDidMount() {
        this.props.dispatch(FetchDatastoreNamespaces())
    }
  render () {
      return (
          <List items={this.props.namespaces} />
      );

  }
}
const Fold = connect(mapStateToProps)(Folder)
export default Fold
