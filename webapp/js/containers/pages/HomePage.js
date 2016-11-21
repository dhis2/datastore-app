import React, {PropTypes, Component} from 'react';

import Sidebar from '../../components/sidebar/Sidebar';
import Window from '../../components/window/Window'

import '../../../style/pages/homepage.scss';

class HomePage extends Component {

    static propTypes = {}

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="home-page-container">
            <Sidebar />
            <Window />
          </div>
        );
    }
}

export default HomePage;
