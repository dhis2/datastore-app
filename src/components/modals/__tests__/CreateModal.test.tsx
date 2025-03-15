import React from 'react'
import CreateModal from '../CreateModal'
import { render } from '@testing-library/react'
import { RenderWrapper } from '../../../utils/test-utils'

it('Create Modal', () => {
    const handleCreate = () => jest.fn()
    const closeModal = () => jest.fn()
    const { debug } = render(

   
        <RenderWrapper>
       <CreateModal
            handleCreate={handleCreate}
            closeModal={closeModal}
            title="Test New Key Modal"
            type={'key'}
        />
        </RenderWrapper>)

    debug()
})
