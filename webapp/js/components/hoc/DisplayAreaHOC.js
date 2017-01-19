import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import LoadingArea from '../display/LoadingArea';
import { ErrorIconWithText } from '../utils/Icons';
import '../../../style/window/window.scss';

const DisplayAreaHOC = (Area) => {
    class DisplayAreaBase extends Component {
        constructor(props) {
            super(props);

            this.renderLoading = this.renderLoading.bind(this);
            this.renderError = this.renderError.bind(this);
        }

        renderLoading() {
            return <LoadingArea />;
        }

        renderError() {
            return <ErrorIconWithText text="An error has occured." />;
        }

        render() {
            const { loading, error } = this.props;

            if (loading) {
                return this.renderLoading();
            }

            if (error) {
                return this.renderError();
            }

            return (
            <Area {...this.props} {...this.state} />
            );
        }
    }

    DisplayAreaBase.propTypes = {
        loading: PropTypes.bool,
        error: PropTypes.bool,
    };

    const mapStateToProps = (state) => ({
        loading: state.display.loading,
        error: state.display.error,
    });

    return connect(
        mapStateToProps
    )(DisplayAreaBase);
};

export default DisplayAreaHOC;
