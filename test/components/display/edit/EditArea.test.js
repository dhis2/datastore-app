import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { EditArea } from '../../../../webapp/js/components/display/edit/EditArea';

describe('Component: EditArea', () => {
    let component;

    beforeEach(() => {
        component = shallow(<EditArea value={'test'} />);
    });

    it('should render without exploding', () => {
        expect(component.length).to.equal(1);
    });
});
