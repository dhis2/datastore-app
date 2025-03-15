import React from 'react'
import DeleteModal from '../DeleteModal'
import { render } from '@testing-library/react'
import { RenderWrapper } from '../../../utils/test-utils'

it('Delete Modal', () => {
    const handleDelete = () => jest.fn()
    const closeModal = () => jest.fn()
    const { debug } = render(
        <RenderWrapper>
        <DeleteModal
            handleDelete={handleDelete}
            closeModal={closeModal}
            title="Test Delete Namespace Modal"
            type={'namespace'}
            activeNamespace={'test namespace'}
        />
        </RenderWrapper>)
    debug()
})

