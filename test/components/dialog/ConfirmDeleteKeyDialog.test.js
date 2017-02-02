import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Dialog from 'material-ui/Dialog';
import { ConfirmDeleteKeyDialog } from '../../../webapp/js/components/dialog/ConfirmDeleteKeyDialog';

describe('Component: ConfirmDeleteKeyDialog', () => {
    let component;

    const testDialogProps = {
        namespace: 'test',
        key: 'test',
    };

    beforeEach(() => {
        component = shallow(<ConfirmDeleteKeyDialog dialogprops={ testDialogProps } />);
    });

    it('should render ConfirmDeleteKeyDialog without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render Dialog', () => {
        expect(component.find(Dialog)).to.have.length(1);
    });
});
