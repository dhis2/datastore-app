import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ErrorArea from '../../../webapp/js/components/display/ErrorArea';
import { ErrorIconWithText } from '../../../webapp/js/components/utils/Icons';
import Paper from 'material-ui/Paper';

describe('Component: ErrorArea', () => {
    let component;

    beforeEach(() => {
        component = shallow(<ErrorArea />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render ErrorIconWithText component', () => {
        expect(component.find(ErrorIconWithText)).to.have.length(1);
    });
});
