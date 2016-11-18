import React, { PropTypes, Component } from 'react'

import "bootstrap/dist/css/bootstrap.css";
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';

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
