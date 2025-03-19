import React, { createContext, useContext, useMemo, useState } from 'react'

type EditContextProps = {
    editorChanges: string
    setEditorChanges: React.Dispatch<React.SetStateAction<string>>
}

const EditContext = createContext<EditContextProps>({
    editorChanges: null,
    setEditorChanges: () => {},
})

export const EditContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [editorChanges, setEditorChanges] = useState(null)

    const contextValue = useMemo(
        () => ({
            editorChanges,
            setEditorChanges,
        }),
        [editorChanges]
    )

    return (
        <EditContext.Provider value={contextValue}>
            {children}
        </EditContext.Provider>
    )
}

export const useEditContext = () => useContext(EditContext)
