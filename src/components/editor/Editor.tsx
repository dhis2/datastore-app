import { Center, CircularLoader, Tab, TabBar } from '@dhis2/ui'
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
            <div className={classes.editorBackground}>
                {loading && (
                    <Center>
                        <CircularLoader small />
                    </Center>
                )}
                {!loading && view === 'code' && (
                    <CodeEditor
                        initialData={value}
                        onChange={handleEditorChange}
                    />
                )}

                {!loading && view === 'tree' && <TreeViewEditor data={value} />}
            </div>
        </>
    )
}

export default Editor
