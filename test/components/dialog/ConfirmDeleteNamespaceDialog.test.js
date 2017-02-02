import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Dialog from 'material-ui/Dialog';
import { ConfirmDeleteNamespaceDialog } from '../../../webapp/js/components/dialog/ConfirmDeleteNamespaceDialog';

describe('Component: ConfirmDeleteNamespaceDialog', () => {
    let component;

    const testDialogProps = {
        namespace: 'test',
    };

    beforeEach(() => {
        component = shallow(<ConfirmDeleteNamespaceDialog dialogprops={ testDialogProps } />);
    });

    it('should render ConfirmDeleteNamespaceDialog without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render Dialog', () => {
        expect(component.find(Dialog)).to.have.length(1);
    });
});
