import React, { createContext, useContext, useState } from 'react'

type SidePanelContextProps = {
    panelType: string
    children: React.ReactElement[]
    totalItems: number
}

export const SidePanelContext = createContext(null)

export const SidePanelContextProvider = ({
    panelType,
    children,
    totalItems,
}: SidePanelContextProps) => {
    const [selectedLinkItem, setSelectedLinkItem] = useState(null)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    return (
        <SidePanelContext.Provider
            value={{
                panelType,
                selectedLinkItem,
                setSelectedLinkItem,
                totalItems,
                openDeleteModal,
                setOpenDeleteModal,
            }}
        >
            {children}
        </SidePanelContext.Provider>
    )
}

export const useSidePanelContext = () => useContext(SidePanelContext)
