import { PropTypes } from '@dhis2/prop-types'
import ErrorIcon from 'material-ui/svg-icons/alert/error.js'
import ModeComment from 'material-ui/svg-icons/editor/mode-comment.js'
import React, { Component } from 'react'
import styles from '../display/Display.module.css'

const containerStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    // marginTop: 0,
}

const iconStyle = {
    fill: 'rgb(117, 117, 117)',
    display: 'block',
    margin: '0 auto 0 auto',
    width: '100px',
    height: 'auto',
}

export class ModeCommentIconWithText extends Component {
    render() {
        const { text } = this.props
        return (
            <div className={styles.displayArea} style={containerStyle}>
                <div>
                    <ModeComment style={iconStyle} />
                    <p>{text}</p>
                </div>
            </div>
        )
    }
}

export class ErrorIconWithText extends Component {
    render() {
        const { text } = this.props
        return (
            <div className={styles.displayArea} style={containerStyle}>
                <div>
                    <ErrorIcon style={iconStyle} />
                    <p>{text}</p>
                </div>
            </div>
        )
    }
}

ModeCommentIconWithText.propTypes = {
    text: PropTypes.string,
}

ErrorIconWithText.propTypes = {
    text: PropTypes.string,
}
