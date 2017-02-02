import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { ModeCommentIconWithText, ErrorIconWithText } from '../../../webapp/js/components/utils/Icons';

describe('Component: ModeCommentIconWithText & ErrorIconWithText', () => {
    let component;

    const testText = 'test';

    it('should render ModeCommentIconWithText without exploding', () => {
        component = shallow(<ModeCommentIconWithText text={ testText } />);
        expect(component.length).to.equal(1);
    });

    it('should render ErrorIconWithText without exploding', () => {
        component = shallow(<ErrorIconWithText text={ testText } />);
        expect(component.length).to.equal(1);
    });
});
