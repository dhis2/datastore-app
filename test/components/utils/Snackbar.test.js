import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import SnackbarUI from 'material-ui/Snackbar';
import { Snackbar } from '../../../webapp/js/components/utils/Snackbar';


describe('Component: Snackbar', () => {
    let component;

    const testMessage = 'test';

    beforeEach(() => {
        component = shallow(<Snackbar label={ testMessage } />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render FlatButton', () => {
        expect(component.find(SnackbarUI)).to.have.length(1);
    });
});
