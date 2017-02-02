import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { NamespaceItem } from '../../../webapp/js/components/sidebar/NamespaceItem';

describe('Component: NamespaceItem', () => {
    let component;

    const namespace = {
        error: false,
        name: 'test',
        fetching: false,
        open: false,
        keys: {
            test1: 'test',
            test2: 'test',
        },
    };

    beforeEach(() => {
        component = shallow(<NamespaceItem namespace={ namespace } search={ 'test' } />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });
});
