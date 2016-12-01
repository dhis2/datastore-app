import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import JSONEditor from '../../webapp/js/components/utils/JSONEditor';


describe('Component: NavigationBar', () => {
    let component;

    const testObject = 'test';
    const testArray = true;

    it('should render without exploding', () => {
        component = shallow(<JSONEditor />);
        expect(component.length).to.equal(1);
    });

    it('should render with array', () => {
        component = shallow(<JSONEditor value={ testObject } />);
        expect(component.length).to.equal(1);
    });

    it('should render with object', () => {
        component = shallow(<JSONEditor value={ testArray } />);
        expect(component.length).to.equal(1);
    });

});
