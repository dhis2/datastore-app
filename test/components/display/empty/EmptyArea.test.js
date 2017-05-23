import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { EmptyArea } from '../../../../webapp/js/components/display/empty/EmptyArea';
import { ModeCommentIconWithText } from '../../../../webapp/js/components/utils/Icons';
import Paper from 'material-ui/Paper';

describe('Component: EmptyArea', () => {
    let component;

    beforeEach(() => {
        component = shallow(<EmptyArea />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render ModeCommentIconWithText component', () => {
        expect(component.find(ModeCommentIconWithText)).to.have.length(1);
    });
});
