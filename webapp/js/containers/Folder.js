import React, { PropTypes, Component } from 'react';
import connect from 'react-redux';

const mapStateToProps = (state) => {
    return {
        namespaces: state.api.namespaces
    }
}
class Folder extends Component {

  render () {
      const { namespaces } = this.props;
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
//const Fold = connect(mapStateToProps)(Folder)
//export default Fold
