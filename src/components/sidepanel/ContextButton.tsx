import { Button, IconMore16, Popover, IconDelete16 } from '@dhis2/ui'
import React, { useRef } from 'react'
import { useSidePanelContext } from '../../context/SidePanelContext'
import i18n from '../../locales'
import classes from '../Panel.module.css'

type ContextMenuButtonProps = {
    handleContextMenu: () => void
    openContextMenu: boolean
    setOpenContextMenu: (boolean) => void
}

const ContextMenuButton = ({
    handleContextMenu,
    openContextMenu,
    setOpenContextMenu,
}: ContextMenuButtonProps) => {
    const ref = useRef(null)
    const { setOpenDeleteModal } = useSidePanelContext()

    return (
        <div ref={ref}>
            <Button
                aria-label="More"
                icon={<IconMore16 />}
                name="more"
                onClick={handleContextMenu}
                title="More"
            />
            {openContextMenu && (
                <Popover
                    reference={ref}
                    placement="right-start"
                    onClickOutside={() => setOpenContextMenu(false)}
                >
                    <div
                        className={classes.contextMenu}
                        style={{
                            width: '150px',
                            padding: 6,
                        }}
                    >
                        <Button
                            aria-label={i18n.t('delete')}
                            icon={<IconDelete16 />}
                            name={i18n.t('delete')}
                            onClick={() => {
                                setOpenContextMenu(false)
                                setOpenDeleteModal(true)
                            }}
                            title={i18n.t('delete')}
                        >
                            {i18n.t('Delete')}
                        </Button>
                    </div>
                </Popover>
            )}
        </div>
    )
}

export default ContextMenuButton
