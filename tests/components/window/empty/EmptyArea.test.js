import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { EmptyArea } from '../../../../webapp/js/components/window/empty/EmptyArea';
import Paper from 'material-ui/Paper';

describe('Component: EmptyArea', () => {
    let component;

    beforeEach(() => {
        component = shallow(<EmptyArea />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render Paper component', () => {
        expect(component.find(Paper)).to.have.length(1);
    });
});
