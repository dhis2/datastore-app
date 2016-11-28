import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';

import HistoryToolbar from './HistoryToolbar';
import HistoryArea from './HistoryArea';

import { fetchHistoryForNamespace, fetchHistory } from '../../../actions/actions';

import '../../../../style/valueWindow/valueWindow.scss';

class HistoryWindow extends Component {

    componentDidMount() {
        const { namespace, key } = this.props.params;
        if (typeof key !== 'undefined') {
            this.props.fetchHistory(namespace, key);
        } else {
            this.props.fetchHistoryForNamespace(namespace);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.params.key !== prevProps.params.key &&
            typeof this.props.params.key !== 'undefined') {
            this.props.fetchHistory(this.props.params.namespace, this.props.params.key);
        }
        else if (this.props.params.namespace !== prevProps.params.namespace) {
                 this.props.fetchHistoryForNamespace(this.props.params.namespace);
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
    fetchHistoryForNamespace(namespace) {
        dispatch(fetchHistoryForNamespace(namespace));
    },
    fetchHistory(namespace, key) {
        dispatch(fetchHistory(namespace, key));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HistoryWindow);
