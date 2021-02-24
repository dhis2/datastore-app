import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as navigationActions from '../../actions/navigationActions'
import DialogRoot from './DialogRoot'

export class ConfirmNavigationDialog extends Component {
    constructor() {
        super()

        this.state = {
            show: false,
            blockNext: false,
            confirmed: false,
            nextLocation: null,
        }

        this.routerWillLeave = this.routerWillLeave.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleConfirm = this.handleConfirm.bind(this)
    }

    handleCancel() {
        this.setState({
            ...this.state,
            confirmed: false,
            show: false,
            blockNext: true,
        })
    }

    handleConfirm() {
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
        const curr = this.props

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

    routerWillLeave(nextLocation) {
        const { value, editedValue } = this.props
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
        const { value, editedValue } = this.props

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
        const saveAction = DialogRoot.buildButton(() => {}, 'Save', true)
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
    closeDialog: PropTypes.func,
    onConfirmNavigation: PropTypes.func,
    onCancelNavigation: PropTypes.func,
    router: PropTypes.object,
}

const mapStateToProps = state => ({
    ignoreNext: state.navigation.ignoreNextConfirm,
})

const mapDispatchToProps = dispatch => ({
    setIgnoreNext(ignoreNext) {
        dispatch(navigationActions.setIgnoreNextNavigationConfirm(ignoreNext))
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmNavigationDialog)
