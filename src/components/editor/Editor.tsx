import { IconInfo16, Tab, TabBar, Tooltip } from '@dhis2/ui'
import React, { useMemo, useState } from 'react'
import classes from '../../App.module.css'
import { CODE_VIEW, TEXT_VIEW, TREE_VIEW } from '../../constants/constants'
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
    const [error, setError] = useState(null)
    const [disableTreeView, setDisableTreeView] = useState(false)
    const [disableTextView, setDisableTextView] = useState(false)

    const jsonValue = useMemo(() => {
        setError(null)
        try {
            return JSON.parse(value)
        } catch (e) {
            setError(e.message)
        }
    }, [value])

    const treeEditorValue = useMemo(() => {
        setDisableTreeView(false)
        if (value === null || value === undefined) {
            return {}
        }
        if (typeof jsonValue === 'object') {
            return jsonValue
        } else {
            setDisableTreeView(true)
        }
    }, [jsonValue, value])

    const textEditorValue = useMemo(() => {
        setDisableTextView(true)
        if (jsonValue === null || jsonValue === undefined) {
            return value
        } else if (typeof jsonValue === 'string') {
            setDisableTextView(false)
            return jsonValue
        } else {
            const isEmptyObject =
                typeof jsonValue === 'object' &&
                Object.keys(jsonValue).length === 0

            if (isEmptyObject || jsonValue === '') {
                setDisableTextView(false)
                return ''
            } else {
                return value
            }
        }
    }, [jsonValue, value])

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
                    <Tab
                        onClick={() => {
                            setView(TEXT_VIEW)
                        }}
                        disabled={disableTextView}
                        selected={view === TEXT_VIEW}
                    >
                        {i18n.t('Text')}
                    </Tab>
                </TabBar>
                <div className={classes.helperIcon}>
                    <Tooltip
                        content={
                            <>
                                {i18n.t(
                                    'The Code editor is a free-form JSON editor.'
                                )}
                                <br />
                                {i18n.t(
                                    'The Tree editor shows expandable nodes of the JSON object.'
                                )}
                                <br />
                                {i18n.t(
                                    'The Text editor allows you to add and edit non-JSON data, e.g. JSONata, DataSonnet, or other mapping expressions; and stores it as a string.'
                                )}
                            </>
                        }
                        placement="right"
                        openDelay={0}
                        closeDelay={0}
                        className={classes.tooltip}
                    >
                        <IconInfo16 color="#6C7787" />
                    </Tooltip>
                </div>
            </div>
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
                        value={textEditorValue}
                        onChange={handleEditorChange}
                        loading={loading}
                    />
                )}
            </>
        </>
    )
}

export default Editor
