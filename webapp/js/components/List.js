import React, {PropTypes, Component} from 'react';

import ListItem from './ListItem';

import "../../style/list/list.scss";

class List extends Component {

  static propTypes = {
    items: PropTypes.array
  }

  constructor(props) {
    super(props);
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
