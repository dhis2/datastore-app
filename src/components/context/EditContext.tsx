import React, { createContext, useContext, useMemo, useState } from 'react'

type EditContextProps = {
    hasUnsavedChanges: boolean
    setHasUnsavedChanges: React.Dispatch<React.SetStateAction<boolean>>
}

const EditContext = createContext<EditContextProps>({
    hasUnsavedChanges: false,
    setHasUnsavedChanges: () => {},
})

export const EditContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    const contextValue = useMemo(
        () => ({
            hasUnsavedChanges,
            setHasUnsavedChanges,
        }),
        [hasUnsavedChanges]
    )

    return (
        <EditContext.Provider value={contextValue}>
            {children}
        </EditContext.Provider>
    )
}

export const useEditContext = () => useContext(EditContext)
