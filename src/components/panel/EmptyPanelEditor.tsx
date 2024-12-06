import React from 'react'
import i18n from '../../locales'
import PanelEditor from './PanelEditor'
import { PanelHeader } from './PanelHeader'

export default function EmptyPanelEditor({
    placeholder,
}: {
    placeholder?: string
}) {
    const defaultMessage = i18n.t(
        'Select a namespace and key to edit its values'
    )
    return (
        <div>
            <PanelHeader>
                <span>Editor</span>
            </PanelHeader>
            <PanelEditor
                value={placeholder || defaultMessage}
                handleChange={() => console.log('')}
            />
        </div>
    )
}
