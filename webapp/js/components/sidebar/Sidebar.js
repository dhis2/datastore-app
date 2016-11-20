import React, {PropTypes, Component} from 'react';

import NamespaceList from './NamespaceList';
import {Toolbar, ToolbarTitle, ToolbarGroup} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

import '../../../style/sidebar/sidebar.scss';

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'sidebar'}>
        <Toolbar>
          <ToolbarTitle text="Namespace"/>
          <ToolbarGroup lastChild={true}>
            <RaisedButton label="New" primary={true} />
          </ ToolbarGroup>
        </Toolbar>
        <NamespaceList />
      </div>
    );
  }
}

export default Sidebar;
