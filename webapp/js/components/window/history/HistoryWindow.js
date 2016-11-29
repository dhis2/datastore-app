import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import HistoryToolbar from './HistoryToolbar';
import HistoryArea from './HistoryArea';

import { fetchHistoryForNamespace, fetchHistory } from '../../../actions/actions';

import '../../../../style/valueWindow/valueWindow.scss';

export class HistoryWindow extends Component {

    componentDidMount() {
        const { getHistoryForKey, getHistoryForNamespace, params: { namespace, key } } = this.props;
        if (typeof key !== 'undefined') {
            getHistoryForKey(namespace, key);
        } else {
            getHistoryForNamespace(namespace);
        }
    }

    componentDidUpdate(prevProps) {
        const { getHistoryForKey, getHistoryForNamespace, params: currentParams } = this.props;
        const { params: prevParams } = prevProps;

        if (currentParams.key !== prevParams.key && typeof currentParams.key !== 'undefined') {
            getHistoryForKey(currentParams.namespace, currentParams.key);
        }
        else if (currentParams.namespace !== prevParams.namespace) {
            getHistoryForNamespace(currentParams.namespace);
        }
    }

    render() {
        const { history } = this.props;
        const { namespace, key } = this.props.params;

        return (
        <Paper className={'window'}>
            <HistoryToolbar namespace={ namespace } selectedKey={ key } />
            <HistoryArea list={ history } />
        </Paper>
        );
    }
}

HistoryWindow.propTypes = {
    history: PropTypes.array,
    namespace: PropTypes.string,
    selectedKey: PropTypes.string,
};

const mapStateToProps = (state) => ({
    namespace: state.window.namespace,
    selectedKey: state.window.key,
    history: state.window.history,
});

const mapDispatchToProps = (dispatch) => ({
    getHistoryForNamespace(namespace) {
        dispatch(fetchHistoryForNamespace(namespace));
    },
    getHistoryForKey(namespace, key) {
        dispatch(fetchHistory(namespace, key));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryWindow);
