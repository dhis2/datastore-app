import { Button } from '@dhis2-ui/button'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales'

export default function DeleteAction({ openModal }) {
    return (
        <Button
            aria-label="Delete key"
            name="Delete key"
            onClick={openModal}
            title="Delete key"
        >
            {i18n.t('Delete')}
        </Button>
    )
}

DeleteAction.propTypes = {
    openModal: PropTypes.func,
}
