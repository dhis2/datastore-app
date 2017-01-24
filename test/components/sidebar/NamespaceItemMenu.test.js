import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { NamespaceItemMenu } from '../../../webapp/js/components/sidebar/NamespaceItemMenu';
import IconMenu from 'material-ui/IconMenu';

describe('Component: NamespaceItemMenu', () => {
    let component;

    beforeEach(() => {
        component = shallow(<NamespaceItemMenu name={ 'test' } />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render List', () => {
        expect(component.find(IconMenu)).to.have.length(1);
    });
});
