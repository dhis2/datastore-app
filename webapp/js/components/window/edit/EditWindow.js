import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import EditToolbar from './EditToolbar';
import EditArea from './EditArea';

import { getValue } from '../../../actions/actions';

import '../../../../style/valueWindow/valueWindow.scss';

class EditWindow extends Component {

    componentDidMount() {
        const { namespace, key } = this.props.params;
        if (typeof namespace !== 'undefined' && typeof key !== 'undefined') {
            this.props.getValue(namespace, key);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.namespace !== prevProps.params.namespace ||
            this.props.params.key !== prevProps.params.key) {
            this.props.getValue(this.props.params.namespace, this.props.params.key);
        }
    }

    render() {
        const { namespace, key } = this.props.params;

        let path = '';

        if (typeof namespace !== 'undefined') {
            path += namespace;
        }
        if (typeof key !== 'undefined') {
            path += `/${key}`;
        }

        return (
        <Paper className={'value-container'}>
            <EditToolbar path={path} />
            <EditArea namespace={ namespace } selectedKey={ key } />
        </Paper>
        );
    }
}

EditWindow.propTypes = {
    selectedKey: PropTypes.string,
    namespace: PropTypes.string,
};

const mapStateToProps = (state) => ({
    value: state.ui.value,
});

const mapDispatchToProps = (dispatch) => ({
    getValue(namespace, key) {
        dispatch(getValue(namespace, key))
    },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditWindow);
