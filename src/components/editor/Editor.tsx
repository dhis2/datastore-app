import { Tab, TabBar } from '@dhis2/ui'
import React, { useMemo, useState } from 'react'
import classes from '../../App.module.css'
import { CODE_VIEW, TREE_VIEW } from '../../constants/constants'
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

    const [error, setError] = useState(null)
    const [disableTreeView, setDisableTreeView] = useState(false)

    const treeEditorValue = useMemo(() => {
        setError(null)
        setDisableTreeView(false)
        try {
            if (value === null || value === undefined) {
                return {}
            }
            const jsonValue = JSON.parse(value)

            if (typeof jsonValue === 'object') {
                return jsonValue
            } else {
                setDisableTreeView(true)
                setView(CODE_VIEW)
            }
        } catch (e) {
            setError(e.message)
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
            </TabBar>
            <>
                {!loading &&
                    (view === CODE_VIEW ? (
                        <CodeEditor
                            value={value}
                            onChange={handleEditorChange}
                        />
                    ) : (
                        view === TREE_VIEW && (
                            <TreeViewEditor
                                value={treeEditorValue}
                                onChange={handleEditorChange}
                                error={error}
                            />
                        )
                    ))}
            </>
        </>
    )
}

export default Editor
