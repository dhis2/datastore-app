import { PropTypes } from '@dhis2/prop-types'
import React, { Component } from 'react'
import DisplayAreaHOC from '../../hoc/DisplayAreaHOC.js'
import JSONEditor from '../../utils/JSONEditor.js'
import styles from '../Display.module.css'

export class EditArea extends Component {
    handleDataChange = (editor) => {
        try {
            // throws error if not valid json
            const data = editor.get()
            this.props.valueChange(data)
        } catch (err) {
            this.props.valueChange(err, true)
        }
    }

    render() {
        const { value, namespace, selectedKey } = this.props

        return (
            <div className={styles.displayArea}>
                <JSONEditor
                    value={value}
                    namespace={namespace}
                    selectedKey={selectedKey}
                    dataChanged={this.handleDataChange}
                />
            </div>
        )
    }
}

EditArea.propTypes = {
    namespace: PropTypes.string,
    selectedKey: PropTypes.string,
    value: PropTypes.any,
    valueChange: PropTypes.func,
}

export default DisplayAreaHOC(EditArea)
