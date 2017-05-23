import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { emptySnackbar} from '../../actions/actions';
import SnackbarUI from 'material-ui/Snackbar';

export class Snackbar extends Component {
    render() {
        return (
            <SnackbarUI open={typeof this.props.message === 'string'}
                message={<span>{this.props.message}</span>}
                autoHideDuration={5000} onRequestClose={this.props.emptySnackbar}
            />
        );
    }
}

Snackbar.propTypes = {
    message: PropTypes.string,
};

const mapStateToProps = (state) => ({
    message: state.snackbar.message,
});

const mapDispatchToProps = (dispatch) => ({
    emptySnackbar() {
        dispatch(emptySnackbar());
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Snackbar);
