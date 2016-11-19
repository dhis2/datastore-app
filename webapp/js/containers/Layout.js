import React, { PropTypes, Component } from 'react'

import "bootstrap/dist/css/bootstrap.css";
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';

import '../../style/layout/layout.scss';

class Layout extends Component {
  render () {
    return (
      <div className={"wrapper"}>
        <div className={"layout-container"}>
          <Toolbar>
              <ToolbarTitle text="dhis2 Datastore" />
          </Toolbar>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default Layout;
