import DisplayAreaHOC from 'components/hoc/DisplayAreaHOC'
import JSONEditor from 'components/utils/JSONEditor'
import React, { PropTypes, Component } from 'react'
import Theme from 'utils/theme'
import '../../../../style/display/display.scss'

export class EditArea extends Component {
    dataFromJSONEditor(editor) {
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

        const backgroundStyle = {
            backgroundColor: Theme.palette.primary3Color,
        }

        return (
            <div className={'fff-display-area'}>
                <JSONEditor
                    value={value}
                    namespace={namespace}
                    selectedKey={selectedKey}
                    dataChanged={this.dataFromJSONEditor.bind(this)}
                />
            </div>
        )
    }
}

EditArea.propTypes = {
    valueChange: PropTypes.func,
    selectedKey: PropTypes.string,
    namespace: PropTypes.string,
    value: PropTypes.any,
}

export default DisplayAreaHOC(EditArea)
