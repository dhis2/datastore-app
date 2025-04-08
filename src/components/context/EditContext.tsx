import { undo, undoDepth } from '@codemirror/commands'
import { EditorView } from '@uiw/react-codemirror'
import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
} from 'react'

type EditContextProps = {
    editorView: EditorView
    setEditorView: (view: EditorView) => void
    hasUnsavedChanges: boolean
    setHasUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>
    revertChanges: () => void
}

const EditContext = createContext<EditContextProps>({
    editorView: null,
    setEditorView: () => {},
    hasUnsavedChanges: false,
    setHasUnsavedChanges: () => {},
    revertChanges: () => {},
})

export const EditContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const editorRef = useRef(null)
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    const editorView = editorRef.current

    const setEditorView = (view) => {
        editorRef.current = view
    }

    const revertChanges = useCallback(() => {
        if (!editorView) {
            return
        }

        while (undoDepth(editorView.state) > 0) {
            undo({
                state: editorView.state,
                dispatch: (tr) => {
                    editorView.dispatch(tr)
                },
            })
        }
    }, [editorView])

    const contextValue = useMemo(
        () => ({
            editorView,
            setEditorView,
            hasUnsavedChanges,
            setHasUnsavedChanges,
            revertChanges,
        }),
        [editorView, hasUnsavedChanges, revertChanges]
    )

    return (
        <EditContext.Provider value={contextValue}>
            {children}
        </EditContext.Provider>
    )
}

export const useEditContext = () => useContext(EditContext)
