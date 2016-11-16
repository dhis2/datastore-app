import React, {PropTypes, Component} from 'react';

import '../../../style/sidebar/sidebar.scss';

import NamespaceList from './NamespaceList';
import WindowTitle from '../general/WindowTitle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

const addBtn = {

}

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'sidebar'}>
        <WindowTitle text={"navigation"} />
          <Toolbar>
              <ToolbarGroup>
                  <FloatingActionButton>
                      <ContentAdd />
                  </FloatingActionButton>
              </ToolbarGroup>
          </Toolbar>
        <NamespaceList />

      </div>
    );
  }
}

export default Sidebar;
