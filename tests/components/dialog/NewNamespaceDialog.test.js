import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Dialog from 'material-ui/Dialog';
import { NewNamespaceDialog } from '../../../webapp/js/components/dialog/NewNamespaceDialog';

describe('Component: NewNamespaceDialog', () => {
    let component;

    const testDialogProps = {
        namespace: 'test',
        key: 'test',
    };

    beforeEach(() => {
        component = shallow(<NewNamespaceDialog dialogprops={ testDialogProps } />);
    });

    it('should render NewNamespaceDialog without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render Dialog', () => {
        expect(component.find(Dialog)).to.have.length(1);
    });
});
