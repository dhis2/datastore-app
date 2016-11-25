import React, { Component } from 'react';

import LoadingArea from '../window/LoadingArea';

import '../../../style/valueWindow/valueWindow.scss';


const WindowAreaHOC = (Area, loading, error) => class extends Component {

    constructor(props) {
        super(props);

        this.renderLoading = this.renderLoading.bind(this);
        this.renderError = this.renderError.bind(this);
    }

    renderLoading() {
        return <LoadingArea />;
    }

    renderError() {
        return (
        <div></div>
        );
    }

    render() {
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
};


export default WindowAreaHOC;
