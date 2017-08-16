import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import NamespaceList from './NamespaceList';
import { fetchNamespaces } from 'actions/actions';
import RaisedButton from 'material-ui/RaisedButton';
import SidebarHeader from './SidebarHeader';
import { openDialog } from 'actions/dialogActions';
import * as dialog from 'constants/dialogTypes';
import SidebarAreaHOC from 'components/hoc/SidebarAreaHOC';
import '../../../style/sidebar/sidebar.scss';

export class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showDialog: false,
            namespaceListImproved: SidebarAreaHOC(NamespaceList, props.getNamespaces),
        };
    }

    componentDidMount() {
        this.props.getNamespaces();
    }

    showDialog() {
        this.props.openNamespaceDialog();
    }

    render() {
        const { items } = this.props;
        const NamespaceListImproved = this.state.namespaceListImproved;

        return (
            <div className={'fff-sidebar'}>
                <SidebarHeader>
                    <RaisedButton label="New" onClick={this.showDialog.bind(this)} primary />
                </SidebarHeader>
                <NamespaceListImproved items={items} />
            </div>
        );
    }
}

Sidebar.propTypes = {
    openNamespaceDialog: PropTypes.func,
    getNamespaces: PropTypes.func,
    items: PropTypes.object,
    search: PropTypes.string,
};

const mapStateToProps = state => ({
    items: state.sidebar.namespaces,
});

const mapDispatchToProps = dispatch => ({
    openNamespaceDialog() {
        dispatch(openDialog(dialog.NEW_NAMESPACE));
    },
    getNamespaces() {
        dispatch(fetchNamespaces());
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);
