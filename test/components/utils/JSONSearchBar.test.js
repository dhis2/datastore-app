import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { JSONSearchBar } from '../../../webapp/js/components/utils/JSONSearchBar';


describe('Component: JSONSearchBar', () => {
    let component;

    it('should render without exploding', () => {
        component = shallow(<JSONSearchBar />);
        expect(component.length).to.equal(1);
    });
});
