import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { KeyItemMenu } from '../../../webapp/js/components/sidebar/KeyItemMenu';
import IconMenu from 'material-ui/IconMenu';

describe('Component: KeyItemMenu', () => {
    let component;

    beforeEach(() => {
        component = shallow(<KeyItemMenu namespace={ 'test' } keyName={ 'test' } />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });

    it('should render List', () => {
        expect(component.find(IconMenu)).to.have.length(1);
    });
});
