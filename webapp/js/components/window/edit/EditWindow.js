import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import EditToolbar from './EditToolbar';
import EditArea from './EditArea';
import WindowAreaHOC from '../../hoc/WindowAreaHOC';

import '../../../../style/valueWindow/valueWindow.scss';


class EditWindow extends Component {
    render() {
        const { loading, error, namespace, selectedKey } = this.props;
        const EditAreaImproved = WindowAreaHOC(EditArea, loading, error);

        let path = '';

        if (typeof namespace !== 'undefined') {
            path += namespace;
        }
        if (typeof selectedKey !== 'undefined') {
            path += `/${selectedKey}`;
        }

        return (
        <Paper className={'value-container'}>
            <EditToolbar path={path} />
            <EditAreaImproved />
        </Paper>
        );
    }
}

EditWindow.propTypes = {
    loading: PropTypes.bool,
    selectedKey: PropTypes.string,
    namespace: PropTypes.string,
    error: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    loading: state.ui.fetching,
    namespace: state.ui.namespace,
    selectedKey: state.ui.key,
    error: false,
});

export default connect(
  mapStateToProps
)(EditWindow);
