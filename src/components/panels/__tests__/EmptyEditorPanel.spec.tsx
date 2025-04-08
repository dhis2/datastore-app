import { within } from '@testing-library/dom'
import React from 'react'
import { render } from '../../../test-utils/render'
import EmptyEditorPanel from '../EmptyEditorPanel'

describe('Empty Editor Panel', () => {
    it('renders empty editor panel', () => {
        const { getByTestId, queryByTestId } = render(<EmptyEditorPanel />)
        const header = getByTestId('panel-header')
        expect(
            within(header).getByText('Choose a key to start editing')
        ).toBeInTheDocument()
        expect(queryByTestId('empty-editor-placeholder')).toBeInTheDocument()
    })
})
