import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';

import ListItem from './ListItem';
import { fetchNamespaces } from '../actions/actions';

import "../../style/list/list.scss";

class List extends Component {

  static propTypes = {
    items: PropTypes.object
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchNamespaces()
  }

  render() {
    const { items, fetching } = this.props;

    if (fetching) {
      return (
          <div>
              LOADING!!
          </div>
      )
    }

    return (
      <ul className={"list"}>
        {Object.keys(items).map((item, index) => (
            <ListItem key = { index } text = { item } />
        ))}
      </ul>
    )
  }
}

const mapStateToProps = (state) => ({
  items: state.api.namespaces,
  fetching: state.api.fetching
});

const masDispatchToProps = (dispatch) => ({
    fetchNamespaces() {
      dispatch(fetchNamespaces());
    }
})

export default connect(mapStateToProps, masDispatchToProps)(List);
