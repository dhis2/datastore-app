import { Button } from '@dhis2-ui/button'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import i18n from '../../locales'
import classes from '../../Page.module.css'
import Editor from '../Editor'
import Header from '../Header'

type EditSectionProps = {
    updateKey: (object) => void
    refetch: (object) => void
    data: { results?: unknown }
    queryLoading: boolean
    error: object
    mutationLoading: boolean
}

const EditSection = ({
    updateKey,
    refetch,
    data,
    queryLoading,
    error,
    mutationLoading,
}: EditSectionProps) => {
    const { key, namespace } = useParams()
    const [value, setValue] = useState(
        JSON.stringify(data?.results, null, 4) || ''
    )

    const handleEditorChange = (value) => {
        setValue(value)
    }

    const handleUpdate = async () => {
        await updateKey({
            key,
            namespace,
            value,
        })
        refetch({
            key,
            namespace,
        })
    }

    useEffect(() => {
        setValue(JSON.stringify(data?.results, null, 4))
    }, [data])

    return (
        <>
            <Header>
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
                        onClick={() => {
                            console.log('Save changes')
                            handleUpdate()
                        }}
                        title={i18n.t('Save')}
                        primary
                        loading={mutationLoading}
                    >
                        {i18n.t('Save changes')}
                    </Button>
                </div>
            </Header>
            <div>
                <Editor
                    value={
                        queryLoading
                            ? i18n.t('Loading')
                            : error
                            ? i18n.t('Error getting this information')
                            : value
                    }
                    handleChange={handleEditorChange}
                />
            </div>
        </>
    )
}

export default EditSection
