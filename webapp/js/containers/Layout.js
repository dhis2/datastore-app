import React, { PropTypes, Component } from 'react'
import NavBarCustom from '../components/NavBarCustom';
import AppBar from 'material-ui/AppBar';
import "../../style/main.scss";
import "bootstrap/dist/css/bootstrap.css";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class Layout extends Component {
  render () {
    return (
      <div>
        <Toolbar>
            <ToolbarTitle text="DHIS2" />
            </Toolbar>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Layout;
