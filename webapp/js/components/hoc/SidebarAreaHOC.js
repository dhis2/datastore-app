import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import IconButton from 'material-ui/IconButton';
import { Spinner } from 'components/utils/Loaders';
import '../../../style/sidebar/sidebar.scss';

const containerStyle = {
    alignItems: 'center',
    justifyContent: 'center',
};

const alignmentStyle = {
    marginTop: '-60px',
};

const SidebarAreaHOC = (Area, errorRefresh) => {
    class SidebarAreaBase extends Component {
        constructor(props) {
            super(props);

            this.renderLoading = this.renderLoading.bind(this);
            this.renderError = this.renderError.bind(this);
        }

        renderLoading() {
            return (
              <div className={'fff-sidebar-list'} style={ containerStyle }>
                  <Spinner size={'medium'} style={ alignmentStyle } />
              </div>
            );
        }

        renderError() {
            return (
              <div className={'fff-sidebar-list'} style={ containerStyle }>
                <IconButton style={ alignmentStyle } onTouchTap={ errorRefresh }>
                    <NavigationRefresh />
                </IconButton>
                <p>Try again</p>
              </div>
            );
        }

        render() {
            const { loading, error, items } = this.props;

            if (loading || items.length < 1) {
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

    SidebarAreaBase.propTypes = {
        loading: PropTypes.bool,
        error: PropTypes.bool,
        errorRefresh: PropTypes.func,
        items: PropTypes.object,
    };

    const mapStateToProps = (state) => ({
        loading: state.sidebar.fetching,
        error: state.sidebar.error,
    });

    return connect(
        mapStateToProps
    )(SidebarAreaBase);
};

export default SidebarAreaHOC;
