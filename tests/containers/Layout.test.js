import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Layout from '../../webapp/js/containers/Layout';

describe('Component: Layout', () => {
    let component;

    beforeEach(() => {
        component = shallow(<Layout />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });
});
