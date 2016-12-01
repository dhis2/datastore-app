import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import NamespaceList from '../../../webapp/js/components/sidebar/NamespaceList';
import { List } from 'material-ui/List';

describe('Component: NamespaceList', () => {
    let component;

    const testSearch = '';
    const testItems = {
        test1: 'test1',
        test2: 'test2',
    };

    beforeEach(() => {
        component = shallow(<NamespaceList search={ testSearch } items={ testItems } />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render List', () => {
        expect(component.find(List)).to.have.length(1);
    });
});
