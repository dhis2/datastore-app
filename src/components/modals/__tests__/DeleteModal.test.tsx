import React from 'react'
import { renderComponentWithRouter } from '../../../test-utils/render'
// import DeleteModal from '../DeleteModal'

it('Delete Modal', () => {
    // const handleDelete = () => jest.fn()
    // const closeModal = () => jest.fn()
    const { debug } = renderComponentWithRouter(
        <div />
        // {/* <DeleteModal
        //     handleDelete={handleDelete}
        //     closeModal={closeModal}
        //     title="Test Delete Namespace Modal"
        //     type={'namespace'}
        //     activeNamespace={'test namespace'}
        // /> */}
    )
    debug()
})
