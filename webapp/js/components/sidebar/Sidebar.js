import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import NamespaceList from './NamespaceList';
import { Toolbar, ToolbarTitle, ToolbarGroup } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Searchbar from './Searchbar';
import '../../../style/sidebar/sidebar.scss';
import { openNamespaceDialog } from '../../actions/dialogActions';

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDialog: false,
        };
    }

    showDialog() {
        this.props.openNamespaceDialog();
    }

    render() {
        return (
            <div className={'sidebar'}>
                <Paper style={{ zIndex: 5 }}>
                    <Toolbar>
                        <Searchbar />
                        <ToolbarGroup>

                            <RaisedButton label="New" onClick={this.showDialog.bind(this)} primary />
                        </ToolbarGroup>
                    </Toolbar>
                </Paper>
                <NamespaceList />
            </div>
        );
    }
}

Sidebar.propTypes = {
    openNamespaceDialog: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
    openNamespaceDialog() {
        dispatch(openNamespaceDialog());
    },
});

export default connect(
  null,
  mapDispatchToProps
)(Sidebar);
