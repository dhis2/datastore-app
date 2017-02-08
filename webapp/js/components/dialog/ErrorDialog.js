import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { closeErrorDialog } from 'actions/dialogActions';

export class ErrorDialog extends Component {

    constructor(props) {
        super(props);

        this.handleClose.bind(this);
    }

    handleClose() {
        this.props.closeDialog();
    }

    render() {
        console.log(this.props.message)
        const actions = [
            <FlatButton
                label="Ok"
                primary
                onTouchTap={this.handleClose.bind(this)}
            />,
        ];
        return (
            (<Dialog
                actions={actions}
                modal={false}
                open
                contentStyle={{ maxWidth: '400px' }}
                onRequestClose={this.handleClose.bind(this)}
            >
                { this.props.message }
            </Dialog>)
        );
    }
}

const mapStateToProps = state => ({
    message: state.dialog.props.message
});

const mapDispatchToProps = (dispatch) => ({
    closeDialog() {
        dispatch(closeErrorDialog());
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ErrorDialog);
