import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { KeyItem } from '../../../webapp/js/components/sidebar/KeyItem';

describe('Component: KeyItem', () => {
    let component;

    beforeEach(() => {
        component = shallow(<KeyItem index={1} params={{key:'test'}}namespace={ 'test' } keyName={ 'test' } />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });
});
