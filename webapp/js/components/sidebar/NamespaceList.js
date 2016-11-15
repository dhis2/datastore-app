import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';

import '../../../style/sidebar/namespacelist.scss';

import NamespaceListItem from './NamespaceListItem';
import { fetchNamespaces, fetchAndToggleNamespace } from '../../actions/actions';

class NamespaceList extends Component {
  constructor(props) {
    super(props);

    this.renderLoading = this.renderLoading.bind(this);
    this.renderList = this.renderList.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  componentDidMount() {
    this.props.fetchNamespaces();
  }

  renderLoading() {
    return (
      <span>LOADING!</span>
    )
  }

  renderError(error) {
    return (
      <span>ERROR!</span>
    )
  }

  renderList() {
    const {items, fetchAndToggleNamespace} = this.props;
    return (
      <ul className={"sidebar-navigation"}>
        {Object.keys(items).map((item, index) => (
            <NamespaceListItem namespace={items[item]} event={fetchAndToggleNamespace} key={index} />
        ))}
      </ul>
    )
  }

  render() {
    const {fetching, error} = this.props;

    if(fetching) {
      return this.renderLoading()
    }

    if(error) {
      return this.renderError();
    }

    return this.renderList();
  }
}

const mapStateToProps = (state) => ({
  items: state.api.namespaces,
  fetching: state.api.fetching,
  error: state.api.error
});

const mapDispatchToProps = (dispatch) => ({
    fetchNamespaces() {
      dispatch(fetchNamespaces());
    },
    fetchAndToggleNamespace(namespace) {
      dispatch(fetchAndToggleNamespace(namespace));
    }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NamespaceList)
