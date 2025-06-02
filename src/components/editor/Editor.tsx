import { Tab, TabBar } from '@dhis2/ui'
import React, { useState } from 'react'
import classes from '../../App.module.css'
import i18n from '../../locales'
import CodeEditor from './CodeEditor'
import TreeViewEditor from './TreeEditor'

type EditorViewMode = 'tree' | 'code'

type EditorProps = {
    loading: boolean
    value: string
    handleEditorChange: (string) => void
}

const Editor = ({ loading, value, handleEditorChange }: EditorProps) => {
    const [view, setView] = useState<EditorViewMode>('code')
    return (
        <>
            <TabBar className={classes.tabs}>
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
                    {i18n.t('Tree')}
                </Tab>
            </TabBar>
            <>
                {!loading &&
                    (view === 'code' ? (
                        <CodeEditor
                            value={value}
                            onChange={handleEditorChange}
                        />
                    ) : (
                        view === 'tree' && (
                            <TreeViewEditor
                                value={value}
                                onChange={handleEditorChange}
                            />
                        )
                    ))}
            </>
        </>
    )
}

export default Editor
