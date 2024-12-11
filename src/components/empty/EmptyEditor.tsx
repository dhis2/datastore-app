import React from 'react'
import i18n from '../../locales'
import PanelEditor from '../sidepanel/PanelEditor'
import { PanelHeader } from '../sidepanel/PanelHeader'

export default function EmptyEditor({ placeholder }: { placeholder?: string }) {
    const defaultMessage = i18n.t(
        'Select a namespace and key to edit its values'
    )
    return (
        <div>
            <PanelHeader>
                <span>{''}</span>
            </PanelHeader>
            <PanelEditor
                value={placeholder || defaultMessage}
                handleChange={() => console.log('')}
            />
        </div>
    )
}
