import React, { PropTypes, Component} from 'react';
import "../../style/list/list-item.scss";
/**
 *  ListItem component for rendering items in the datastre
 */
class ListItem extends Component {

  static propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  render() {

    const { text, type } = this.props;

    switch(type) {
      case "namespace": {
        reutrn (
          <li className={"list-item list-item-namespace"}>
            <div></div>
            <div>{text}</div>
          </li>
        );
      }
      case "item": {
        return (
          <li className={"list-item list-item-item"}>{text}</li>
        );
      }
      default: {
        return (
          <li className={"list-item list-item-defaul"}>
            <div className={"list-item-preview"}></div>
            <div className={"list-item-text"}>{text}</div>
          </li>
        );
      }
    }

  }
}


export default ListItem;
