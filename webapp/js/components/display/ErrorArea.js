import React, { Component } from 'react';
import { ErrorIconWithText } from '../utils/Icons';

class ErrorArea extends Component {
    render() {
        return (
            <ErrorIconWithText text="An error has occurred." />
        );
    }
}

export default ErrorArea;
