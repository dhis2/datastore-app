import { Tab, TabBar } from '@dhis2/ui'
import React, { useEffect, useState } from 'react'
import classes from '../../App.module.css'
import { CODE_VIEW, TREE_VIEW, TEXT_VIEW } from '../../constants/constants'
import i18n from '../../locales'
import CodeEditor from './CodeEditor'
import TextEditor from './TextEditor'
import TreeViewEditor from './TreeEditor'

type EditorViewMode = 'tree' | 'code' | 'text'

type EditorProps = {
    loading: boolean
    value: string
    handleEditorChange: (string) => void
}

const Editor = ({ loading, value, handleEditorChange }: EditorProps) => {
    const [view, setView] = useState<EditorViewMode>('code')
    const [disableTreeView, setDisableTreeView] = useState(false)
    // const [disableTextView, setDisableTextView] = useState(false)
    const [error, setError] = useState(null)

    const [treeEditorValue, setTreeEditorValue] = useState(null)
    // const [codeEditorValue, setCodeEditorValue] = useState(value)

    useEffect(() => {
        setError(null)
        try {
            const jsonValue = JSON.parse(value)
            if (typeof jsonValue !== 'object') {
                setDisableTreeView(true)
            } else {
                setDisableTreeView(false)
            }

            // if (typeof jsonValue === "string"){
            //     setDisableTextView(false)
            // } else {
            //     setDisableTextView(true)
            // }

            setTreeEditorValue(jsonValue)

            // if (typeof jsonValue === "string"){
            //     setCodeEditorValue(JSON.stringify(value))
            // } else {
            //     setCodeEditorValue(value)
            // }
        } catch {
            setError('Invalid JSON detected. Fix in the code editor.')
        }
    }, [value])

    return (
        <>
            <TabBar className={classes.tabs}>
                <Tab
                    onClick={() => {
                        setView(CODE_VIEW)
                    }}
                    selected={view === CODE_VIEW}
                >
                    {i18n.t('Code')}
                </Tab>
                <Tab
                    onClick={() => {
                        setView(TREE_VIEW)
                    }}
                    disabled={disableTreeView}
                    selected={view === TREE_VIEW}
                >
                    {i18n.t('Tree')}
                </Tab>
                <Tab
                    onClick={() => {
                        setView(TEXT_VIEW)
                    }}
                    // disabled={disableTextView}
                    selected={view === TEXT_VIEW}
                >
                    {i18n.t('Text')}
                </Tab>
            </TabBar>
            <>
                {view === CODE_VIEW && (
                    <CodeEditor
                        value={value}
                        onChange={handleEditorChange}
                        loading={loading}
                    />
                )}
                {view === TREE_VIEW && (
                    <TreeViewEditor
                        value={treeEditorValue}
                        onChange={handleEditorChange}
                        error={error}
                        loading={loading}
                    />
                )}
                {view === TEXT_VIEW && (
                    <TextEditor
                        value={value}
                        onChange={handleEditorChange}
                        loading={loading}
                    />
                )}
            </>
        </>
    )
}

export default Editor
