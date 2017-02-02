import React, { Component } from 'react';
import { ErrorIconWithText } from 'components/utils/Icons';

class ErrorArea extends Component {
    render() {
        return (
            <ErrorIconWithText text="An error has occurred." />
        );
    }
}

export default ErrorArea;
