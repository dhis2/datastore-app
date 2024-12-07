import { Button } from '@dhis2-ui/button'
import React from 'react'
import i18n from '../../../locales'
import Editor from '../Editor'
import Header from '../Header'
import classes from '../Page.module.css'

const EditPage = () => {
    return (
        <>
            <Header>
                <div className={classes.editPageHeader}>
                    Keys - Breadcrumbs go here
                    <div className={classes.editButtons}>
                        <Button
                            aria-label={i18n.t('Cancel')}
                            name="cancel"
                            onClick={() => console.log('')}
                            title={i18n.t('Cancel')}
                        >
                            {i18n.t('Cancel')}
                        </Button>
                        <Button
                            aria-label={i18n.t('Save')}
                            name="create"
                            onClick={() => console.log('Save changes')}
                            title={i18n.t('Save')}
                            primary
                        >
                            {i18n.t('Save changes')}
                        </Button>
                    </div>
                </div>
            </Header>
            <div>
                <Editor value={'write some code here'} />
            </div>
        </>
    )
}

export default EditPage
