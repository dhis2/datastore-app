import React, {PropTypes, Component} from 'react';

import '../../../style/sidebar/sidebar.scss';

import NamespaceList from './NamespaceList';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar';

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'sidebar'}>
        <Toolbar>
          <ToolbarTitle text="Navigation" />
        </Toolbar>
        <NamespaceList />
      </div>
    );
  }
}

export default Sidebar;
