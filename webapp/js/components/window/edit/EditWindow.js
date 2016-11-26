import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import EditToolbar from './EditToolbar';
import EditArea from './EditArea';

import '../../../../style/valueWindow/valueWindow.scss';

class EditWindow extends Component {
    render() {
        const { namespace, selectedKey } = this.props;

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
            <EditArea />
        </Paper>
        );
    }
}

EditWindow.propTypes = {
    selectedKey: PropTypes.string,
    namespace: PropTypes.string,
};

const mapStateToProps = (state) => ({
    namespace: state.ui.namespace,
    selectedKey: state.ui.key,
});

export default connect(
  mapStateToProps
)(EditWindow);
