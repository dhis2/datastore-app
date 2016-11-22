import React, {PropTypes, Component} from 'react';
import { connect } from 'react-redux';
import Sidebar from '../../components/sidebar/Sidebar';
import ValueArea from '../../components/valueWindow/ValueArea'
import DialogRoot from '../../components/dialog/DialogRoot';
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
              <DialogRoot />
          </div>
        );
    }
}
const mapStateToProps = (state) => ({
   openNameSpaceDialog: state.ui.openNamespaceDialog
});

export default connect(
    mapStateToProps,
    null
)(HomePage);

