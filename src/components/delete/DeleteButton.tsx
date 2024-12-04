import { Button } from '@dhis2-ui/button'
import PropTypes from 'prop-types'
import React from 'react'
import i18n from '../../locales'

export default function DeleteButton({ openModal }) {
    return (
        <Button
            aria-label={i18n.t('Delete')}
            name="Delete"
            onClick={openModal}
            title={i18n.t('Delete')}
        >
            {i18n.t('Delete')}
        </Button>
    )
}

DeleteButton.propTypes = {
    openModal: PropTypes.func,
}
