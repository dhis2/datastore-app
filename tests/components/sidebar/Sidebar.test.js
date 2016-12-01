import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Sidebar } from '../../../webapp/js/components/sidebar/Sidebar';

describe('Component: Sidebar', () => {
    let component;

    const testSearch = '';
    const testItems = {
        test1: 'test1',
        test2: 'test2',
    };

    beforeEach(() => {
        component = shallow(<Sidebar search={ testSearch } items={ testItems } />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });
});
