import React, { PropTypes, Component } from 'react'
import NavBarCustom from '../components/NavBarCustom';

import "../../style/main.scss";
import "bootstrap/dist/css/bootstrap.css";

class Layout extends Component {
  render () {
    return (
      <div>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
