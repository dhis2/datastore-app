import React, {PropTypes, Component} from 'react';

export default class SideMenu extends Component {

  static propTypes() {
      items: PropTypes.array
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (<div>MyComponent</div>);
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.data.items
  }
}

export default connect(mapStateToProps, {

})(SideMenu);
