import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import EmptyWindow from '../../webapp/js/components/window/empty/EmptyWindow';
import { ModeCommentIconWithText } from '../../webapp/js/components/utils/Icons';
import Paper from 'material-ui/Paper';

describe('Component: EmptyWindow', () => {

    let component;

    beforeEach(() => {
        component = shallow(<EmptyWindow />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render ModeCommentIconWithText component', () => {
        expect(component.find(Paper)).to.have.length(1);
    });
    
});
