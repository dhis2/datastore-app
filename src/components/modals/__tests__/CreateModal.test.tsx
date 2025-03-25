import React from 'react'
import { renderComponentWithRouter } from '../../../test-utils/render'
// import CreateModal from '../CreateModal'

it('Create Modal', () => {
    // const handleCreate = () => jest.fn()
    // const closeModal = () => jest.fn()
    const { debug } = renderComponentWithRouter(
        <div />

        //    <CreateModal
        //         handleCreate={handleCreate}
        //         closeModal={closeModal}
        //         title="Test New Key Modal"
        //         type={'key'}
        //     />
    )

    debug()
})
