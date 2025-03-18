import { EditorView, Extension, Panel, showPanel } from '@uiw/react-codemirror'

const activeLinePanelTheme = EditorView.baseTheme({
    '.cm-active-panel': {
        padding: '4px 6px',
        fontSize: '13px',
        backgroundColor: '#292c34',
        color: '#A4ABB7',
    },
    '.cm-panels.cm-panels-bottom': {
        borderTop: '1px solid #16181D !important',
    },
})

const trackCursorPosition = (view) => {
    const pos = view.state.selection.main.head
    const line = view.state.doc.lineAt(pos)
    const column = pos - line.from + 1
    return {
        lineNumber: line.number,
        column,
    }
}

const activeLinePanel = (view: EditorView): Panel => {
    const dom = document.createElement('div')
    dom.className = 'cm-active-panel'
    const { lineNumber, column } = trackCursorPosition(view)
    dom.textContent = `Line: ${lineNumber}, Column: ${column}`
    return {
        dom,
        update(viewUpdate) {
            if (viewUpdate.docChanged || viewUpdate.selectionSet) {
                const { lineNumber, column } = trackCursorPosition(viewUpdate)
                dom.textContent = `Line: ${lineNumber}, Column: ${column}`
            }
        },
    }
}

export const activeLine = (): Extension => [
    showPanel.of(activeLinePanel),
    activeLinePanelTheme,
]
