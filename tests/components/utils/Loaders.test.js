import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Spinner } from '../../../webapp/js/components/utils/Loaders';


describe('Component: Spinner', () => {
    let component;

    it('should render without exploding', () => {
        component = shallow(<Spinner />);
        expect(component.length).to.equal(1);
    });

    it('should render small Spinner', () => {
        component = shallow(<Spinner size={'small'} />);
        expect(component.length).to.equal(1);
    });

    it('should render medium Spinner', () => {
        component = shallow(<Spinner size={'medium'} />);
        expect(component.length).to.equal(1);
    });

    it('should render large Spinner', () => {
        component = shallow(<Spinner size={'large'} />);
        expect(component.length).to.equal(1);
    });

});
