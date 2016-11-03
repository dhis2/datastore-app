import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';

import ListItem from './ListItem';
import { FetchDatastoreNamespaces } from '../actions/actions';

import "../../style/list/list.scss";

class List extends Component {

  static propTypes = {
    items: PropTypes.array
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getItems();
  }

  render() {
    const { items } = this.props;
    return (
      <ul className={"list"}>
        {items.map((item) => (
            <ListItem key = { item.id } text = { item.text } />
        ))}
      </ul>
    )
  }
}


export default List;
