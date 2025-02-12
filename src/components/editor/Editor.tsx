import { Tab, TabBar } from '@dhis2/ui'
import { EditorView } from '@uiw/react-codemirror'
import React, { useState } from 'react'
import i18n from '../../locales'
import CodeEditor from './CodeEditor'
import TreeViewEditor from './TreeEditor'

type EditorViewMode = 'tree' | 'code'

type EditorProps = {
    loading: boolean
    value: string
    setEditorView?: (view: EditorView) => void
}

const Editor = ({ loading, value, setEditorView }: EditorProps) => {
    const [view, setView] = useState<EditorViewMode>('code')
    return (
        <>
            <TabBar>
                <Tab
                    onClick={() => {
                        setView('code')
                    }}
                    selected={view === 'code'}
                >
                    {i18n.t('Code')}
                </Tab>
                <Tab
                    onClick={() => {
                        setView('tree')
                    }}
                    selected={view === 'tree'}
                >
                    {' '}
                    {i18n.t('Tree')}
                </Tab>
            </TabBar>
            <div>
                {!loading &&
                    (view === 'code' ? (
                        <CodeEditor
                            value={value}
                            setEditorView={setEditorView}
                        />
                    ) : (
                        view === 'tree' && <TreeViewEditor data={value} />
                    ))}
            </div>
        </>
    )
}

export default Editor
