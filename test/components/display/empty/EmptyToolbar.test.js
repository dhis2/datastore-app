import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import EmptyToolbar from '../../../../webapp/js/components/display/empty/EmptyToolbar';
import Paper from 'material-ui/Paper';

describe('Component: EmptyToolbar', () => {
    let component;

    beforeEach(() => {
        component = shallow(<EmptyToolbar />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render Paper component', () => {
        expect(component.find(Paper)).to.have.length(1);
    });
});
