import React, { PropTypes, Component} from 'react';

class ListItem extends Component {

  static propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  render() {

    const { text } = this.props;

    return (
      <li>{text}</li>
    )
  }
}

export default ListItem;
