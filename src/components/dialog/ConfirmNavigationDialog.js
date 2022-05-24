import { PropTypes } from '@dhis2/prop-types'
import Dialog from 'material-ui/Dialog'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as navigationActions from '../../actions/navigationActions.js'
import DialogRoot from './DialogRoot.js'

export class ConfirmNavigationDialog extends Component {
    constructor() {
        super()

        this.state = {
            show: false,
            blockNext: false,
            confirmed: false,
            nextLocation: null,
        }
    }

    handleCancel = () => {
        this.setState({
            ...this.state,
            confirmed: false,
            show: false,
            blockNext: true,
        })
    }

    handleConfirm = () => {
        this.setState(
            { ...this.state, confirmed: true, show: false, blockNext: false },
            () => this.props.router.push(this.state.nextLocation)
        )
    }

    componentDidMount() {
        this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        )
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const next = nextProps

        if (this.props.ignoreNext) {
            this.setState({ ...this.state, blockNext: false })
            this.props.setIgnoreNext(false)
            return
        }
        if (next.value !== next.editedValue) {
            this.setState({ ...this.state, blockNext: true })
        } else {
            this.setState({ ...this.state, blockNext: false, confirmed: false })
        }
    }

    routerWillLeave = (nextLocation) => {
        if (this.state.confirmed) {
            this.setState({
                ...this.state,
                confirmed: false,
                blockNext: false,
            })
            return true
        }
        if (this.state.blockNext && !this.props.ignoreNext) {
            this.setState({
                ...this.state,
                show: true,
                blockNext: false,
                nextLocation,
            })
            return false
        }
        return true
    }

    render() {
        const cancelAction = DialogRoot.buildButton(
            this.handleCancel,
            'Stay',
            false
        )
        const confirmAction = DialogRoot.buildButton(
            this.handleConfirm,
            'Discard',
            true
        )
        return (
            <Dialog
                open={this.state.show}
                title={'Unsaved changes'}
                actions={[cancelAction, confirmAction]}
                modal={true}
                onRequestClose={this.props.cancelNavigation}
            >
                You have unsaved changes! Are you sure you want to discard them?
            </Dialog>
        )
    }
}

ConfirmNavigationDialog.propTypes = {
    cancelNavigation: PropTypes.any,
    ignoreNext: PropTypes.any,
    route: PropTypes.object,
    router: PropTypes.object,
    setIgnoreNext: PropTypes.any,
}

const mapStateToProps = (state) => ({
    ignoreNext: state.navigation.ignoreNextConfirm,
})

const mapDispatchToProps = (dispatch) => ({
    setIgnoreNext(ignoreNext) {
        dispatch(navigationActions.setIgnoreNextNavigationConfirm(ignoreNext))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmNavigationDialog)
