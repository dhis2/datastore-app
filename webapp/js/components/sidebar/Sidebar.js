import React, {PropTypes, Component} from 'react';

import '../../../style/sidebar/sidebar.scss';

import NamespaceList from './NamespaceList';
import WindowTitle from '../general/WindowTitle';

class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'sidebar'}>
        <WindowTitle text={"navigation"} />
        <NamespaceList />
      </div>
    );
  }
}

export default Sidebar;
