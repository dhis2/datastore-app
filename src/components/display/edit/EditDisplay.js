import { PropTypes } from '@dhis2/prop-types'
import Paper from 'material-ui/Paper'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
    fetchAndDisplayKeyValue,
    fetchAndToggleNamespace,
    updateValue,
    valueChange,
    rejectFormat,
    rejectUpdateValue,
} from '../../../actions'
import {
    jsonEditorCompact,
    jsonEditorFormat,
} from '../../../actions/jsonEditorActions'
import ConfirmNavigationDialog from '../../dialog/ConfirmNavigationDialog'
import styles from '../Display.module.css'
import EditArea from './EditArea'
import EditToolbar from './EditToolbar'

/* eslint-disable react/prop-types */
/* eslint-disable react/sort-prop-types */
/* eslint-disable max-params */

export class EditDisplay extends Component {
    constructor() {
        super()
        this.state = {
            valueError: null,
        }
        this.handleChangeValue = this.handleChangeValue.bind(this)
        this.handleFormatValue = this.handleFormatValue.bind(this)
        this.handleFormatValueCompact = this.handleFormatValueCompact.bind(this)
        this.handleSaveValue = this.handleSaveValue.bind(this)
    }

    componentDidMount() {
        const {
            getValue,
            params: { namespace, key },
        } = this.props
        if (typeof namespace !== 'undefined' && typeof key !== 'undefined') {
            getValue(namespace, key)
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { fetchedNamespaces, params: nextParams } = nextProps
        const {
            fetchKeysForNamespace,
            getValue,
            params: currentParams,
        } = this.props
        // Load keys for namespace if its not already loaded

        if (
            (!this.props.fetchedNamespaces && fetchedNamespaces) ||
            !fetchedNamespaces
        ) {
            fetchKeysForNamespace(nextParams.namespace, true)
        }

        // Get value when url is different from last.
        if (
            currentParams.namespace !== nextParams.namespace ||
            currentParams.key !== nextParams.key
        ) {
            getValue(nextParams.namespace, nextParams.key)
        }
    }

    handleSaveValue() {
        const { editedValue } = this.props
        const { namespace, key } = this.props.params

        if (this.state.valueError) {
            this.props.rejectUpdateValue(
                namespace,
                key,
                editedValue,
                'Failed to update value: Not valid JSON'
            )
        } else if (editedValue) {
            this.props.updateValue(namespace, key, editedValue)
        }
    }

    handleChangeValue(data, err) {
        const { valueChange } = this.props
        const { namespace, key } = this.props.params

        if (err) {
            this.setState({
                ...this.state,
                valueError: err,
            })
        } else {
            this.setState({
                ...this.state,
                valueError: false,
            })
            valueChange(namespace, key, data)
        }
    }

    handleFormatValue() {
        if (this.state.valueError) {
            this.props.rejectFormat('Failed to format value: Not valid JSON')
        } else {
            this.props.jsonFormat()
        }
    }

    handleFormatValueCompact() {
        if (this.state.valueError) {
            this.props.rejectFormat('Failed to format value: Not valid JSON')
        } else {
            this.props.jsonCompact()
        }
    }

    render() {
        const { namespace, selectedKey } = this.props
        let path = ''

        if (typeof namespace !== 'undefined') {
            path += namespace
        }
        if (typeof selectedKey !== 'undefined') {
            path += `/${selectedKey}`
        }

        return (
            <Paper zDepth={0} className={styles.display}>
                <ConfirmNavigationDialog
                    route={this.props.route}
                    router={this.props.router}
                    value={this.props.value}
                    editedValue={this.props.editedValue}
                />
                <EditToolbar
                    path={path}
                    handleSave={this.handleSaveValue}
                    handleFormat={this.handleFormatValue}
                    handleFormatCompact={this.handleFormatValueCompact}
                />
                <EditArea
                    namespace={namespace}
                    selectedKey={selectedKey}
                    value={this.props.value}
                    valueChange={this.handleChangeValue}
                />
            </Paper>
        )
    }
}

EditDisplay.propTypes = {
    selectedKey: PropTypes.string,
    namespace: PropTypes.string,
    fetchedNamespaces: PropTypes.bool,
    fetchKeysForNamespace: PropTypes.func,
    updateValue: PropTypes.func,
    rejectUpdateValue: PropTypes.func,
    getValue: PropTypes.func,
    params: PropTypes.shape({
        namespace: PropTypes.string,
        key: PropTypes.string,
    }),
}

const mapStateToProps = state => ({
    value: state.display.value,
    selectedKey: state.display.key,
    namespace: state.display.namespace,
    editedValue: state.display.editedValue,
    fetchedNamespaces: state.sidebar.fetched,
})

const mapDispatchToProps = dispatch => ({
    getValue(namespace, key) {
        dispatch(fetchAndDisplayKeyValue(namespace, key))
    },
    fetchKeysForNamespace(namespace, open) {
        dispatch(fetchAndToggleNamespace(namespace, open))
    },
    updateValue(namespace, key, value) {
        dispatch(updateValue(namespace, key, value))
    },
    valueChange(namespace, key, value) {
        dispatch(valueChange(namespace, key, value))
    },
    rejectUpdateValue(namespace, key, value, err) {
        dispatch(rejectUpdateValue(namespace, key, value, err))
    },
    rejectFormat(err) {
        dispatch(rejectFormat(err))
    },
    jsonFormat() {
        dispatch(jsonEditorFormat())
    },
    jsonCompact() {
        dispatch(jsonEditorCompact())
    },
})

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(EditDisplay)
)
