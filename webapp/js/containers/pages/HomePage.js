import React, {PropTypes, Component} from 'react';

import Sidebar from '../../components/sidebar/Sidebar';
import ValueArea from '../../components/valueWindow/ValueArea'

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
            <ValueArea />
          </div>
        );
    }
}

export default HomePage;
