import { IconQuestion16, Tab, TabBar, Tooltip } from '@dhis2/ui'
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
            <div className={classes.tabsContainer}>
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
                <div className={classes.helperIcon}>
                    <Tooltip
                        content={i18n.t(
                            'The Code Editor shows the key value in proper JSON format. The Tree Editor shows collapsible nodes of the key value of object and array data types only.'
                        )}
                        placement="right"
                        openDelay={0}
                        closeDelay={0}
                        className={classes.tooltip}
                    >
                        <IconQuestion16 color="#6C7787" />
                    </Tooltip>
                </div>
            </div>
            <>
                {view === CODE_VIEW ? (
                    <CodeEditor
                        value={value}
                        onChange={handleEditorChange}
                        loading={loading}
                    />
                ) : (
                    view === TREE_VIEW && (
                        <TreeViewEditor
                            value={treeEditorValue}
                            onChange={handleEditorChange}
                            error={error}
                            loading={loading}
                        />
                    )
                )}
            </>
        </>
    )
}

export default Editor
