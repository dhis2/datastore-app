import React, { Component, PropTypes } from 'react';
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

ErrorDialog.propTypes = {
    message: PropTypes.string,
};

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
