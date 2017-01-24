import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Dialog from 'material-ui/Dialog';
import { NamespaceDialog } from '../../../webapp/js/components/dialog/NewKeyDialog';

describe('Component: NamespaceDialog', () => {
    let component;

    const testDialogProps = {
        namespace: 'test',
        key: 'test',
    };

    beforeEach(() => {
        component = shallow(<NamespaceDialog dialogprops={ testDialogProps } />);
    });

    it('should render NamespaceDialog without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render Dialog', () => {
        expect(component.find(Dialog)).to.have.length(1);
    });
});
