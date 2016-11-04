import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';

import ListItem from './ListItem';
import { fetchNamespaces, fetchKeys } from '../actions/actions';

import "../../style/list/list.scss";

class List extends Component {

  static propTypes = {
    items: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.renderError = this.renderError.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
    this.renderList = this.renderList.bind(this);
  }

  componentDidMount() {
    this.props.fetchNamespaces()
  }

  renderLoading() {
    return (
        <div>
            LOADING!!!
        </div>
    )
  }

  renderError() {
    return (
      <div>
        ERROR!!!
      </div>
    )
  }

  renderList(items) {
    const {fetchKeys} = this.props
    return (
      <ul className={"list"}>
        {Object.keys(items).map((item, index) => (
            <ListItem key = { index } event = {fetchKeys} text = { item } />
        ))}
      </ul>
    )
  }

  render() {
    const { items, fetching, error } = this.props;

    if (error) {
      return this.renderError();
    }

    if (fetching) {
      return this.renderLoading();
    }

    return this.renderList(items);
  }
}

const mapStateToProps = (state) => ({
  items: state.api.namespaces,
  fetching: state.api.fetching,
  error: state.api.error
});

const masDispatchToProps = (dispatch) => ({
    fetchNamespaces() {
      dispatch(fetchNamespaces());
    },
    fetchKeys(namespace) {
      dispatch(fetchKeys(namespace));
    }
})

export default connect(mapStateToProps, masDispatchToProps)(List);
