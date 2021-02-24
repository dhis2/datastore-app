import Paper from 'material-ui/Paper'
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { fetchHistoryForNamespace, fetchHistory } from '../../../actions'
import HistoryArea from './HistoryArea'
import HistoryToolbar from './HistoryToolbar'

import '../../../../style/display/display.scss'

export class HistoryDisplay extends Component {
    componentDidMount() {
        const {
            getHistoryForKey,
            getHistoryForNamespace,
            params: { namespace, key },
        } = this.props
        if (typeof key !== 'undefined') {
            getHistoryForKey(namespace, key)
        } else {
            getHistoryForNamespace(namespace)
        }
    }

    componentDidUpdate(prevProps) {
        const {
            getHistoryForKey,
            getHistoryForNamespace,
            params: currentParams,
        } = this.props
        const { params: prevParams } = prevProps

        if (
            currentParams.key !== prevParams.key &&
            typeof currentParams.key !== 'undefined'
        ) {
            getHistoryForKey(currentParams.namespace, currentParams.key)
        } else if (
            currentParams.namespace !== prevParams.namespace ||
            (typeof currentParams.key === 'undefined' &&
                typeof prevParams.key !== 'undefined')
        ) {
            getHistoryForNamespace(currentParams.namespace)
        }
    }

    render() {
        const { history } = this.props
        const { namespace, key } = this.props.params

        return (
            <Paper zDepth={0} className={'fff-display'}>
                <HistoryToolbar namespace={namespace} selectedKey={key} />
                <HistoryArea list={history} />
            </Paper>
        )
    }
}

HistoryDisplay.propTypes = {
    history: PropTypes.array,
    namespace: PropTypes.string,
    selectedKey: PropTypes.string,
    getHistoryForKey: PropTypes.func,
    getHistoryForNamespace: PropTypes.func,
    params: PropTypes.shape({
        namespace: PropTypes.string,
        key: PropTypes.string,
    }),
}

const mapStateToProps = state => ({
    namespace: state.display.namespace,
    selectedKey: state.display.key,
    history: state.display.history,
})

const mapDispatchToProps = dispatch => ({
    getHistoryForNamespace(namespace) {
        dispatch(fetchHistoryForNamespace(namespace))
    },
    getHistoryForKey(namespace, key) {
        dispatch(fetchHistory(namespace, key))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(HistoryDisplay)
