import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux'
import { FetchDatastoreNamespaces} from '../actions/actions.js';
const mapStateToProps = (state) => {
    console.log(state);
    return {
        namespaces: state.api.namespaces
    }
}
class Folder extends Component {
    componentWillMount() {
        this.props.dispatch(FetchDatastoreNamespaces())
    }
  render () {
      const { namespaces } = this.props;
      if(!namespaces.length) {
          return <h2>Loading...</h2>
      }
      const mappedNamespaces = namespaces.map(namespace => <li>{namespace}</li>);
    return (
      <div>
        <ul>
          {mappedNamespaces}
        </ul>
      </div>
    );
  }
}
const Fold = connect(mapStateToProps)(Folder)
export default Fold
