import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import EmptyWindow from '../../webapp/js/components/window/empty/EmptyWindow';
import EmptyToolbar from '../../webapp/js/components/window/empty/EmptyToolbar';
import EmptyArea from '../../webapp/js/components/window/empty/EmptyArea';
import Paper from 'material-ui/Paper';

describe('Component: EmptyWindow', () => {

    let component;

    beforeEach(() => {
        component = shallow(<EmptyWindow />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render Paper component', () => {
        expect(component.find(Paper)).to.have.length(1);
    });

    it('should render EmptyToolbar component', () => {
        expect(component.find(EmptyToolbar)).to.have.length(1);
    });

    it('should render EmptyArea component', () => {
        expect(component.find(EmptyArea)).to.have.length(1);
    });

});
