import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import LoadingArea from 'components/display/LoadingArea';
import ErrorArea from 'components/display/ErrorArea';
import '../../../style/display/display.scss';

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
            return <ErrorArea error={ this.props.errorMessage } />;
        }

        render() {
            const { loading, error, ...props } = this.props;

            if (loading) {
                return this.renderLoading();
            }

            if (error) {
                return this.renderError();
            }

            return (
                <Area {...props} {...this.state} />
            );
        }
    }

    DisplayAreaBase.propTypes = {
        loading: PropTypes.bool,
        error: PropTypes.bool,
        errorMessage: PropTypes.object,
    };

    const mapStateToProps = (state) => ({
        loading: state.display.fetching,
        error: state.display.error,
        errorMessage: state.display.errorMessage,
    });

    return connect(
        mapStateToProps
    )(DisplayAreaBase);
};

export default DisplayAreaHOC;
