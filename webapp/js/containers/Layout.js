import React, { PropTypes, Component } from 'react'
import NavBarCustom from '../components/NavBarCustom';

import "bootstrap/dist/css/bootstrap.css";

class Layout extends Component {
  render () {
    return (
      <div>
        <NavBarCustom />
        <div className={ "container" }>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
